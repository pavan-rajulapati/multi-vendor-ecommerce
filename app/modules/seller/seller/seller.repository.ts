import prisma from "@/lib/db";
import { SellerInputDTO } from "./seller.validation";

export function CreateSeller(userId : string, data : SellerInputDTO) {
    return prisma.seller.create({
        data : {
            userId,
            ...data

        }
    })
}

export function UpdateUserToSeller(userId : string) {
    return prisma.user.update({
        where : {
            id : userId
        },
        data : {
            role : "VENDOR"
        }
    })
}

