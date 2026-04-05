import { cookies } from "next/headers";

export async function SetToken(accessToken: string, refreshToken : string) {
    const cookieStore = await cookies();

    cookieStore.set({
        name: "accessToken",
        value: accessToken,
        secure : true,
        httpOnly: true,
        sameSite: "strict",
        maxAge: 15 * 60,
    });

    cookieStore.set({
        name : "refreshToken",
        value : refreshToken,
        secure : true,
        httpOnly : true,
        sameSite : "strict",
        maxAge : 7 * 24 * 60 * 60
    })
}

export async function DeleteToken() {
    const cookieStore = await cookies()

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken"); 
}