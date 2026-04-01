import { SignupController } from "@/app/modules/auth/auth.controller";
import { NextRequest } from "next/server";

export async function POST(req : NextRequest) {
    return await SignupController(req)
}