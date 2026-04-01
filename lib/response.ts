import { NextResponse } from "next/server"

export const ApiResponse = {
    success : (data : any, message = "Success", status = 200) => {
        return NextResponse.json({
            success : true,
            message,
            data
        }, {status})
    },

    error : (message = "Internal Server Error", status = 500, errors : any = null) => {
        return NextResponse.json({
            success : false,
            message,
            errors,
        }, {status})
    }
} 