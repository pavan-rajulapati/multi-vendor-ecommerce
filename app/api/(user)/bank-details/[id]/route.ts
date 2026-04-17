import { DeleteBankAccountController, GetBankAccountController, UpdateBankAccountController } from "@/app/modules/user/bank-details/bank-details.controller";

export const GET = GetBankAccountController;
export const PATCH = UpdateBankAccountController;
export const DELETE = DeleteBankAccountController;