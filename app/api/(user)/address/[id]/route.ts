import { DeleteAddressController, FetchAddressByIdController, UpdateAddressController } from "@/app/modules/user/address/address.controller";

export const GET = FetchAddressByIdController;
export const PATCH = UpdateAddressController;
export const DELETE = DeleteAddressController;