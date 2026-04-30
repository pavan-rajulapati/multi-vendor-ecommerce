import { RouteHandler } from "@/app/common/utils/route-handler";
import { ApiResponse } from "@/lib/response";
import { SellerInputSchema } from "./seller.validation";
import * as Seller from "./seller.service";

export const CreateSellerController = RouteHandler(async (req) => {
    const body = await req.json()

    const validateData = SellerInputSchema.parse(body)

    const result = await Seller.Create(validateData)
    return ApiResponse.success(result, "Seller created", 201)
})