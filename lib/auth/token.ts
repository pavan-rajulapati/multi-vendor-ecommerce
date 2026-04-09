import { cookies } from "next/headers";

export async function SetToken(accessToken: string, refreshToken : string) {
    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === "production";

    cookieStore.set({
        name: "accessToken",
        value: accessToken,
        secure : isProduction,
        httpOnly: true,
        sameSite: "strict",
        maxAge: 15 * 60,
        path: "/"
    });

    cookieStore.set({
        name : "refreshToken",
        value : refreshToken,
        secure : isProduction,
        httpOnly : true,
        sameSite : "strict",
        maxAge : 7 * 24 * 60 * 60,
        path: "/"
    })
}

export async function DeleteToken() {
    const cookieStore = await cookies()

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken"); 
}