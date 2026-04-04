import { NextResponse } from "next/server"

export const ApiResponse = {
    success : (data : any, message = "success", status = 200) => {
        return NextResponse.json({
            success : true,
            message,
            data
        }, {status})
    }
} 