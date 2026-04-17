import { GetAuthenticatedUser } from "@/middleware/verify-token";
import { BankAccountInputDTO, UpdateBankAccountInputDTO } from "./bank-details.validation";
import { AppError } from "@/lib/error/app-error";
import { CreateBankAccount, DeleteBankAccount, GetAllBankAccounts, GetBankAccount, UpdateBankAccount } from "./bank-details.repository";

export async function Create(data : BankAccountInputDTO) {
    const user = await GetAuthenticatedUser()

    if(!user) {
        throw new AppError("Unauthorized", 401, "UNAUTHORIZED")
    }

    const bankDetails = await CreateBankAccount(user.userId, data)

    return bankDetails
}

export async function GetAll() {
    const user = await GetAuthenticatedUser()

    const bankAccounts = await GetAllBankAccounts(user.userId)

    if(!bankAccounts && Object.keys(bankAccounts).length === 0){
        return []
    }

    return bankAccounts
}

export async function Get(id : string) {
    const user = await GetAuthenticatedUser()

    const bankAccount = await GetBankAccount(id, user.userId)

    if (!bankAccount) {
        throw AppError.NotFound("Bank account");
    }

    return bankAccount
}

export async function Update(id : string, data : UpdateBankAccountInputDTO) {
    const user = await GetAuthenticatedUser()

    const updatedBankAccount = await UpdateBankAccount(user.userId, id, data)

    if(!updatedBankAccount && Object.keys(updatedBankAccount).length === 0){
        return []
    }

    return updatedBankAccount
}

export async function Delete(id : string) {
    const user = await GetAuthenticatedUser()

    const deleteBankAccount = await DeleteBankAccount(id, user.userId)

    if(!deleteBankAccount){
        throw AppError.NotFound()
    }

    return deleteBankAccount
}