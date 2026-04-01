import { SigninController } from "@/app/modules/auth/auth.controller";
import { NextRequest } from "next/server";

export async function POST(req : NextRequest){
    return SigninController(req)
}