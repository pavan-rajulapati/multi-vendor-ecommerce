import { CreateUser, IsUserExist, UpdateRefreshToken } from "./auth.repository";
import bcrypt from "bcryptjs"
import { SigninDTO, SignupDTO } from "./auth.validation";
import { AppError } from "@/lib/app-error";
import { GenerateAccessToken, GenerateRefreshToken } from "./auth.lib";
import { HashToken } from "@/lib/hash-token";
import { cookies } from "next/headers";

export async function SignupService(body: SignupDTO) {
    const { name, email, password } = body;

    const user = await IsUserExist(email)

    if (user) {
        throw new AppError("Email is already registered", 409)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await CreateUser({
        name,
        email,
        password: hashedPassword,
    })

    const accessToken = GenerateAccessToken(newUser.id, newUser.role)
    const refreshToken = GenerateRefreshToken(newUser.id, newUser.role)

    const hashedRefreshToken = HashToken(refreshToken)
    await UpdateRefreshToken(newUser.id, hashedRefreshToken)

    return {
        accessToken,
        refreshToken
    };
}

export async function SigninService(body: SigninDTO) {
    const { email, password } = body;

    const user = await IsUserExist(email)

    if (!user) {
        throw new AppError("User Does'nt Exist", 401)
    }

    const verifyPassword = await bcrypt.compare(password, user.password)

    if (!verifyPassword) {
        throw new AppError("Invalid Password", 401)
    }

    const accessToken = GenerateAccessToken(user.id, user.role)
    const refreshToken = GenerateRefreshToken(user.id, user.role)

    const hashedRefreshToken = HashToken(refreshToken)
    await UpdateRefreshToken(user.id, hashedRefreshToken)

    return {
        accessToken,
        refreshToken
    }

}
