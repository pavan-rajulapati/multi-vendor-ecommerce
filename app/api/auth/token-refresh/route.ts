import { RefreshTokenController } from "@/app/modules/auth/auth.controller";

export async function POST() {
    return await RefreshTokenController()
}