import prisma from "@/lib/db";
import { SignupDTO } from "./auth.validation";

export async function IsUserExist(email : string) {
    return prisma.user.findUnique({
        where : {
            email
        }
    })
}

export async function CreateUser(data : SignupDTO) {
    return prisma.user.create({
        data : {
            name : data.name,
            email : data.email,
            password : data.password
        }
    })
}

export async function UpdateRefreshToken(userId : string, token : string){
    return prisma.user.update({
        where : {
            id : userId
        },
        data : {
            refreshToken : token
        }
    })
}

export async function FindUserById(userId : string) {
    return prisma.user.findUnique({
        where : {
            id : userId
        }
    })
}

