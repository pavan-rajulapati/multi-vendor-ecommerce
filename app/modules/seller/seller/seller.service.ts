import { GetAuthenticatedUser } from "@/middleware/verify-token";
import { SellerInputDTO } from "./seller.validation";
import { CreateSeller, UpdateUserToSeller } from "./seller.repository";

export async function Create(data : SellerInputDTO) {
    const user = await GetAuthenticatedUser()

    const seller = await CreateSeller(user.userId, data)

    if(seller){
        await UpdateUserToSeller(user.userId)
    }

    return seller
}