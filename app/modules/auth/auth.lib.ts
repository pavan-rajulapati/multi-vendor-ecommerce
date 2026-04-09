import jwt from "jsonwebtoken"

export function GenerateAccessToken (userId : string, role : string) {
    return jwt.sign(
        {userId, role},
        process.env.ACCESS_TOKEN_SECRET!,
        {expiresIn : "15m"}
    )
}

export function GenerateRefreshToken (userId : string, role : string) {
    return jwt.sign(
        {userId, role},
        process.env.REFRESH_TOKEN_SECRET!,
        {expiresIn : "7d"}
    )
}

export function VerifyAccessToken (token : string) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
}

export function VerifyRefreshToken (token : string) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!)
}
