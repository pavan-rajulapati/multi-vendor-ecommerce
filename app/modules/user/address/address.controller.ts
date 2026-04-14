import { RouteHandler } from "@/app/common/utils/route-handler";
import { AddressInputSchema, UpdateAddressInputSchema } from "./address.validation";
import * as address from "./address.service";
import { ApiResponse } from "@/lib/response";
import { AppError } from "@/lib/error/app-error";

export const CreateAddressController = RouteHandler(async (req) => {
    const body = await req.json()

    if(!body) {
        throw new AppError("Empty data", 400, "VALIDATION_ERROR")
    }

    const validateData = AddressInputSchema.parse(body)

    const result = await address.Create(validateData)

    return ApiResponse.success(result, "Address Created Successfully", 200)
})

export const FetchAddressController = RouteHandler(async () => {

    const result = await address.Fetch()

    return ApiResponse.success(result, "Fetched successfully", 200)
    
})

export const FetchAddressByIdController = RouteHandler(async (req, ctx) => {
    const {id} = await ctx.params;

    const result = await address.FetchById(id)

    return ApiResponse.success(result, "Fetched successfully", 200)
    
})

export const UpdateAddressController = RouteHandler(async (req, ctx) => {
    const {id} = await ctx.params;
    const body = await req.json()

    if(!body) {
        throw AppError.BadRequest()
    }

    const validateData = UpdateAddressInputSchema.parse(body)
    const result = await address.Update(id, validateData)

    return ApiResponse.success(result, "Address Updated Successfully", 200)
})

export const DeleteAddressController = RouteHandler(async (req, ctx) => {
    const {id} = await ctx.params;

    await address.Delete(id)

    return ApiResponse.success("Address Deleted Successfully")
})