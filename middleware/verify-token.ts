import { VerifyAccessToken } from "@/app/modules/auth/auth.lib";
import { AppError } from "@/lib/error/app-error";
import { cookies } from "next/headers";

export async function GetAuthenticatedUser() {
    const accessToken = (await cookies()).get("accessToken")?.value

    if (!accessToken) {
        throw new AppError("Login required", 401, "AUTH_REQUIRED");
    }

    try {
        return VerifyAccessToken(accessToken) as { userId: string; role: string };
    } catch (error) {
        throw new AppError("Invalid token", 403, "INVALID_TOKEN")
    }
}