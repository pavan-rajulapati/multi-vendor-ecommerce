import { RouteHandler } from "@/app/common/utils/route-handler";
import { BankDetailsInputSchema } from "./bank-details.validation";
import * as bankAccount from "./bank-details.service";
import { ApiResponse } from "@/lib/response";

export const CreateBankAccountController = RouteHandler(async(req) => {
    const body = await req.json()
    const validateData = BankDetailsInputSchema.parse(body)

    const result = await bankAccount.Create(validateData)

    return ApiResponse.success(result, "Account Created", 200)
})