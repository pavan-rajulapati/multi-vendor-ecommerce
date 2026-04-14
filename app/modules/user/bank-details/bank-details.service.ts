import { GetAuthenticatedUser } from "@/middleware/verify-token";
import { BankDetailsInputDTO } from "./bank-details.validation";
import { AppError } from "@/lib/error/app-error";
import { CreateBankAccount } from "./bank-details.repository";

export async function Create(data : BankDetailsInputDTO) {
    const user = await GetAuthenticatedUser()

    if(!user) {
        throw new AppError("Unauthorized", 401, "UNAUTHORIZED")
    }

    const bankDetails = await CreateBankAccount(user.userId, data)

    return bankDetails
}