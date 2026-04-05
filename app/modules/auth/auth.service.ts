import { CreateUser, IsUserExist, UpdateRefreshToken } from "./auth.repository";
import bcrypt from "bcryptjs"
import { SigninDTO, SignupDTO } from "./auth.validation";
import { AppError } from "@/lib/error/app-error";
import { GenerateAccessToken, GenerateRefreshToken } from "./auth.lib";
import { HashToken } from "@/lib/auth/hash-token";

export async function SignupService(body: SignupDTO) {
    const { name, email, password } = body;

    const user = await IsUserExist(email)

    if (user) {
        throw new AppError("User already exist", 409, "USER_ALREADY_EXIST")
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
        throw new AppError("User not found", 404, "USER_NOT_FOUND")
    }

    const verifyPassword = await bcrypt.compare(password, user.password)

    if (!verifyPassword) {
        throw new AppError("Incorrect password", 401, "PASSWORD_MISMATCH")
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
