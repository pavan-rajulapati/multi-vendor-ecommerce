import prisma from "@/lib/db";
import { AddressInputDTO, UpdateAddressInputDTO } from "./address.validation";

export async function CreateUserAddress(userId: string, data: AddressInputDTO) {
    return prisma.userAddress.create({
        data: {
            userId: userId,
            ...data
        }
    })
}

export async function FetchUserAddress(userId: string) {
    return prisma.userAddress.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            firstName : true,
            lastName : true,
            label : true,
            mobileNumber: true,
            addressLine: true,
            city: true,
            state: true,
            postalCode: true,
            country: true
        }
    })
}

export async function FetchUserAddressById(id : string, userId: string) {
    return prisma.userAddress.findFirst({
        where: {
            id,
            userId
        },
        select: {
            id: true,
            firstName : true,
            lastName : true,
            label : true,
            mobileNumber: true,
            addressLine: true,
            city: true,
            state: true,
            postalCode: true,
            country: true
        }
    })
}

export async function UpdateUserAddress(id : string, userId : string, data : UpdateAddressInputDTO) {
    return prisma.userAddress.update({
        where: {
            id,
            userId
        },
        data : data
    })
}

export async function DeleteUserAddress(id : string, userId : string) {
    return prisma.userAddress.deleteMany({
        where : {
            id,
            userId
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