import prisma from "@/lib/db";
import { BankDetailsInputDTO } from "./bank-details.validation";

export async function CreateBankAccount (userId : string, data : BankDetailsInputDTO) {
    return prisma.userBankDetails.create({
        data : {
            userId : userId,
            ...data
        }
    })
}