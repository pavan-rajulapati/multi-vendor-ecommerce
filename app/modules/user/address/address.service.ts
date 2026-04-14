import { GetAuthenticatedUser } from "@/middleware/verify-token";
import { AddressInputDTO, AddressListResponseSchema, AddressResponseSchema, UpdateAddressInputDTO } from "./address.validation";
import { AppError } from "@/lib/error/app-error";
import { CreateUserAddress, DeleteUserAddress, FetchUserAddress, FetchUserAddressById, isAnyActiveOrders, UpdateUserAddress } from "./address.repository";

export async function Create(body: AddressInputDTO) {
    const user = await GetAuthenticatedUser()

    const userAddress = await CreateUserAddress(
        user.userId,
        body
    )

    return userAddress;

}

export async function Fetch() {
    const user = await GetAuthenticatedUser();

    const rawAddress = await FetchUserAddress(user.userId);

    if (!rawAddress || Object.keys(rawAddress).length === 0) {
        return [];
    }

    const filterData = AddressListResponseSchema.parse(rawAddress)

    return filterData;
}

export async function FetchById(id : string) {
    const user = await GetAuthenticatedUser()

    const rawAddress = await FetchUserAddressById(id, user.userId);

    if (!rawAddress || Object.keys(rawAddress).length === 0) {
        return [];
    }

    const filterData = AddressResponseSchema.parse(rawAddress)

    return filterData;
}

export async function Update(id : string, body: UpdateAddressInputDTO) {
    const user = await GetAuthenticatedUser()

    const activeOrders = await isAnyActiveOrders(user.userId)

    if (activeOrders) {
        throw new AppError(
            "Cannot update address while you have an active order.",
            400,
            "ACTIVE_ORDER_EXISTS"
        );
    }

    const userAddress = await UpdateUserAddress(id, user.userId, body)

    if (!userAddress || Object.keys(userAddress).length === 0) {
        return [];
    }

    return userAddress
}

export async function Delete(id: string) {
    const user = await GetAuthenticatedUser()

    const activeOrders = await isAnyActiveOrders(user.userId)

    if (activeOrders) {
        throw new AppError(
            "Cannot delete address while you have an active order.",
            400,
            "ACTIVE_ORDER_EXISTS"
        );
    }

    await DeleteUserAddress(id, user.userId)
}