import { RouteHandler } from "@/app/common/utils/route-handler";
import { BankAccountInputSchema, UpdateBankAccountInputSchema } from "./bank-details.validation";
import * as bankAccount from "./bank-details.service";
import { ApiResponse } from "@/lib/response";

export const CreateBankAccountController = RouteHandler(async(req) => {
    const body = await req.json()
    const validateData = BankAccountInputSchema.parse(body)

    const result = await bankAccount.Create(validateData)

    return ApiResponse.success(result, "Account Created", 201)
})

export const GetAllBankAccountsController = RouteHandler(async () => {
    const result = await bankAccount.GetAll()

    return ApiResponse.success(result)
})

export const GetBankAccountController = RouteHandler(async (req, ctx) => {
    const { id } = await ctx.params;
    const result = await bankAccount.Get(id)

    return ApiResponse.success(result, "Fetched successfully", 200)
})

export const UpdateBankAccountController = RouteHandler(async(req, ctx) => {
    const body = await req.json()
    const {id} = await ctx.params

    const validateData = UpdateBankAccountInputSchema.parse(body)

    const result = await bankAccount.Update(id, validateData)

    return ApiResponse.success(result)
})

export const DeleteBankAccountController = RouteHandler(async(req, ctx) => {
    const {id} = await ctx.params

    await bankAccount.Delete(id)

    return ApiResponse.success("Bank account deleted successfully")
})