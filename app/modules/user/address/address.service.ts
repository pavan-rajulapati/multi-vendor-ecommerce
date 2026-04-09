import { GetAuthenticatedUser } from "@/middleware/verify-token";
import { AddressResponseSchema, CreateAddressInput } from "./address.validation";
import { AppError } from "@/lib/error/app-error";
import { CreateUserAddress, FetchUserAddress } from "./address.repository";

export async function Create(body : CreateAddressInput) {
    const user = await GetAuthenticatedUser()

    if(!user) {
        throw new AppError("Unauthorized aceess", 401, "UNAUTHORIZED_ACCESS")
    }

    const userAddress = await CreateUserAddress(
        user.userId,
        body
    )

    return userAddress;

}

export async function Fetch() {
    const user = await GetAuthenticatedUser();

    const rawAddress = await FetchUserAddress(user.userId);

    if (!rawAddress) {
        throw new AppError("No address found", 404, "NOT_FOUND");
    }

    const filterData = AddressResponseSchema.parse(rawAddress)

    if (!filterData) {
        throw new AppError("VALIDATION_ERROR")
    }

    return filterData;
}