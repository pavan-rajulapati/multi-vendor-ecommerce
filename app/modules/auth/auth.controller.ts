import { SigninService, SignupService } from "./auth.service";
import { SigninValidation, SignupValidation } from "./auth.validation";
import { DeleteToken, SetToken } from "@/lib/token";
import { ApiResponse } from "@/lib/response";
import { cookies } from "next/headers";
import { GenerateAccessToken, GenerateRefreshToken, VerifyRefreshToken } from "./auth.lib";
import { FindUserById, UpdateRefreshToken } from "./auth.repository";
import { HashToken } from "@/lib/hash-token";
import { RouteHandler } from "@/utils/route-handler";
import { AppError } from "@/lib/error/app-error";

export const SignupController = RouteHandler(async (req) => {
    const body = await req.json()

    const validateData = SignupValidation.parse(body)

    const result = await SignupService(validateData)

    await SetToken(result.accessToken, result.refreshToken)

    return ApiResponse.success(result, "User registered successfully", 201)
})

export const SigninController = RouteHandler(async (req) => {
    const body = await req.json()

    const validateData = SigninValidation.parse(body)

    const result = await SigninService(validateData)

    await SetToken(result.accessToken, result.refreshToken)

    return ApiResponse.success(result, "Logged Successfully", 200)
});

export const RefreshTokenController = RouteHandler(async () => {
    const cookieStore = await cookies();

    const refreshToken = (cookieStore).get("refreshToken")?.value;
    if (!refreshToken) {
        throw new AppError("Unauthorized Access", 401, "REFRESH_TOKEN_MISSING")
    }

    const decodeRefreshToken: any = VerifyRefreshToken(refreshToken)

    const user = await FindUserById(decodeRefreshToken.userId)
    if (!user) {
        throw new AppError("User not found", 404, "USER_NOT_FOUND");
    }

    const hashedRefreshToken = HashToken(refreshToken)
    if (user?.refreshToken !== hashedRefreshToken) {
        throw new AppError("Token Mismatch", 401, "TOKEN_TAMPERED")
    }

    const newAccessToken = GenerateAccessToken(user.id, user.role)
    const newRefreshToken = GenerateRefreshToken(user.id, user.role)

    const newHashedRefreshToken = HashToken(newRefreshToken)
    await UpdateRefreshToken(user.id, newHashedRefreshToken)

    await SetToken(newAccessToken, newRefreshToken)

    return ApiResponse.success({ newAccessToken }, "Token refreshed", 200)
})

export const LogoutController = (async () => {
    DeleteToken()
    return ApiResponse.success(null, "Logged out");
})