import { GetAuthenticatedUser } from "@/middleware/verify-token";
import { AddressResponseSchema, CreateAddressInput, UpdateUserInput } from "./address.validation";
import { AppError } from "@/lib/error/app-error";
import { CreateUserAddress, DeleteUserAddress, FetchUserAddress, isAnyActiveOrders, UpdateUserAddress } from "./address.repository";

export async function Create(body: CreateAddressInput) {
    const user = await GetAuthenticatedUser()

    if (!user) {
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

export async function Update(body: UpdateUserInput) {
    const user = await GetAuthenticatedUser()

    if (!user) {
        throw new AppError("Unauthorized aceess", 401, "UNAUTHORIZED_ACCESS")
    }

    const activeOrders = await isAnyActiveOrders(user.userId)

    if (activeOrders) {
        throw new AppError(
            "Cannot delete address while you have an active order.",
            400,
            "ACTIVE_ORDER_EXISTS"
        );
    }

    const userAddress = await UpdateUserAddress(body)

    return userAddress
}

export async function Delete(addressId: string) {
    const user = await GetAuthenticatedUser()

    if (!user) {
        throw new AppError("Unauthorized aceess", 401, "UNAUTHORIZED_ACCESS")
    }

    const activeOrders = await isAnyActiveOrders(user.userId)

    if (activeOrders) {
        throw new AppError(
            "Cannot delete address while you have an active order.",
            400,
            "ACTIVE_ORDER_EXISTS"
        );
    }

    await DeleteUserAddress(addressId)
}