import { NextRequest } from "next/server";
import { SigninService, SignupService } from "./auth.service";
import { SigninValidation, SignupValidation } from "./auth.validation";
import { DeleteToken, SetToken } from "@/lib/token";
import { ApiResponse } from "@/lib/response";
import z from "zod";
import { AppError } from "@/lib/app-error";
import { cookies } from "next/headers";
import { GenerateAccessToken, GenerateRefreshToken, VerifyRefreshToken } from "./auth.lib";
import { FindUserById, UpdateRefreshToken } from "./auth.repository";
import { HashToken } from "@/lib/hash-token";

export async function SignupController(req: NextRequest) {
    try {
        const body = await req.json()

        const validateData = SignupValidation.parse(body)

        const result = await SignupService(validateData)

        await SetToken(result.accessToken, result.refreshToken)

        return ApiResponse.success(result, "User registered successfully", 201)
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return ApiResponse.error("Validation Failed", 400, error.message)
        }

        if (error instanceof AppError || error.constructor.name === "AppError" || error.statusCode) {
            const message = error.message || "An application error occurred";
            const status = error.statusCode || 400;
            return ApiResponse.error(message, status);
        }

        console.error("INDUSTRIAL_LOG_ERROR:", error);
        return ApiResponse.error("Something went wrong on our end", 500);
    }
}

export async function SigninController(req: NextRequest) {
    try {
        const body = await req.json()

        const validateData = SigninValidation.parse(body)

        const result = await SigninService(validateData)

        await SetToken(result.accessToken, result.refreshToken)

        return ApiResponse.success(result, "User Validated", 200)
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return ApiResponse.error(
                "Validation Failed",
                400,
                error.errors.map(err => ({
                    field: err.path[0],
                    message: err.message
                }))
            )
        }

        if (error instanceof AppError || error.constructor.name === "AppError" || error.statusCode) {
            const message = error.message || "An application error occurred";
            const status = error.statusCode || 400;
            return ApiResponse.error(message, status);
        }

        console.error("INDUSTRIAL_LOG_ERROR:", error);
        return ApiResponse.error("Something went wrong on our end", 500);
    }
}

export async function RefreshTokenController() {
    const cookieStore = cookies();

    const refreshToken = (await cookieStore).get("refreshToken")?.value;
    if (!refreshToken) {
        return ApiResponse.error("Unauthorized Access", 401)
    }

    try {
        const decodeRefreshToken: any = VerifyRefreshToken(refreshToken)

        const user = await FindUserById(decodeRefreshToken.userId)
        if (!user) {
            return ApiResponse.error("User not found", 404);
        }

        const hashedRefreshToken = HashToken(refreshToken)
        if (user?.refreshToken !== hashedRefreshToken) {
            return ApiResponse.error("Token Mismatch", 401)
        }

        const newAccessToken = GenerateAccessToken(user.id, user.role)
        const newRefreshToken = GenerateRefreshToken(user.id, user.role)

        const newHashedRefreshToken = HashToken(newRefreshToken)
        await UpdateRefreshToken(user.id, newHashedRefreshToken)

        await SetToken(newAccessToken, newRefreshToken)

        return ApiResponse.success({ newAccessToken }, "Token refreshed", 200)
    } catch (error) {
        if (error instanceof Error) {
            return ApiResponse.error("Invalid Refresh Token", 401, error)
        }
    }

}

export async function LogoutController() {
    DeleteToken()
    return ApiResponse.success(null, "Logged out");
}