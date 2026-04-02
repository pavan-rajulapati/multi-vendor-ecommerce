import { VerifyAccessToken } from "@/app/modules/auth/auth.lib"
import { cookies } from "next/headers"

export async function getUser() {
    const token = (await cookies()).get("accessToken")?.value

    if (!token) {
        throw new Error("Unauthorized")
    }

    const decoded = VerifyAccessToken(token) as {
        userId: number
        role: string
    }

    return decoded
}

export function requireRole(user: any, roles: string[]) {
    if (!roles.includes(user.role)) {
        throw new Error("Forbidden")
    }
}