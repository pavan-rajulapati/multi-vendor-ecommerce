import { NextResponse } from "next/server";
import { AppError } from "./app-error";
import { ZodError } from "zod";

export async function ErrorHandler(error : any) {
    if(error instanceof AppError && error.isOperational) {
        return NextResponse.json({
            success : false,
            message : error.message,
            errorCode : error.errorCode
        },
        {status : error.statusCode}
    )}

    if (error instanceof ZodError) {
        return NextResponse.json({
            success : false,
            message : error.issues.map(e => ({
                path : e.path.join("."),
                message : e.message
            })),
            errorCode : "VALIDARION_ERROR"
        })
    }

    console.error("❌ SYSTEM ERROR:", error);
    
    return NextResponse.json({
        success : false,
        message : "Something went wrong",
        errorCode : "INTERNAL_ERROR"    
    },{status : 500}
)

}