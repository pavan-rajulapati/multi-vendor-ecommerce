import { RouteHandler } from "@/app/common/utils/route-handler";
import { CreateAddressSchema } from "./address.validation";
import * as address from "./address.service";
import { ApiResponse } from "@/lib/response";

export const CreateAddressController = RouteHandler(async (req) => {
    const body = await req.json()

    const validateData = CreateAddressSchema.parse(body)

    const result = await address.Create(validateData)

    return ApiResponse.success(result, "Address Created Successfully", 200)
})

export const FetchAddressController = RouteHandler(async () => {
    const result = await address.Fetch()

    return ApiResponse.success(result, "Fetched successfully", 200)
    
})