import prisma from "@/lib/db";
import { BankAccountInputDTO, UpdateBankAccountInputDTO } from "./bank-details.validation";

export async function CreateBankAccount (userId : string, data : BankAccountInputDTO) {
    return prisma.userBankDetails.create({
        data : {
            userId : userId,
            ...data
        }
    })
}

export async function GetAllBankAccounts(userId : string) {
    return prisma.userBankDetails.findMany({
        where : {
            userId
        },
        select : {
            id : true,
            holderName : true,
            accountNumber : true,
            ifscCode : true
        }
    })
}

export async function GetBankAccount(id : string, userId : string) {
    return prisma.userBankDetails.findFirst({
        where : {
            id : id,
            userId : userId
        },
        select : {
            id : true,
            holderName : true,
            accountNumber : true,
            ifscCode : true
        }
    })
}

export async function UpdateBankAccount(userId : string, id : string, data : UpdateBankAccountInputDTO) {
    return prisma.userBankDetails.update({
        where : {
            id,
            userId
        },
        data : {
            ...data
        }
    })
}

export async function DeleteBankAccount(id : string, userId : string) {
    return prisma.userBankDetails.delete({
        where : {
            id,
            userId
        }
    })
}