import { ApiResponse } from "@/lib/response";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { VerifyAccessToken } from "../modules/auth/auth.lib";

export async function VerifyToken(req : NextRequest) {
    const cookieStore = await cookies() 

    const accessToken = cookieStore.get("accessToken")?.value
    if(!accessToken) {
        return ApiResponse.error("Unauthorized Access", 401)
    }

    try {
        VerifyAccessToken(accessToken)
        return NextResponse.next()
    } catch (error) {
        if(error instanceof Error){
            return ApiResponse.error("Token Expired", 401, error.message)
        }
    }
}