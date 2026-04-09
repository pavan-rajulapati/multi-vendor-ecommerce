import prisma from "@/lib/db";
import { CreateAddressInput } from "./address.validation";

export async function CreateUserAddress(userId: string, data: CreateAddressInput) {
    return prisma.userAddress.create({
        data: {
            userId: userId,
            ...data
        }
    })
}

export async function FetchUserAddress(userId: string) {
    return prisma.userAddress.findFirst({
        where: {
            userId: userId
        },
        select: {
            id: true,
            mobileNumber: true,
            addressLine: true,
            city: true,
            state: true,
            postalCode: true,
            country: true
        }
    })
}