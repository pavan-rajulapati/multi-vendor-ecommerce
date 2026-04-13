import prisma from "@/lib/db";
import { CreateAddressInput, UpdateUserInput } from "./address.validation";

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

export async function UpdateUserAddress(data : UpdateUserInput) {
    return prisma.userAddress.update({
        where: {
            id : data.id
        },
        data : data
    })
}

export async function DeleteUserAddress(addressId : string) {
    return prisma.userAddress.deleteMany({
        where : {
            id : addressId,
        }
    })
}

export async function isAnyActiveOrders(userId : string) {
    return prisma.order.findFirst({
        where : {
            userId : userId,
            status : {in : ['PENDING', 'SHIPPED']}
        }
    })
}