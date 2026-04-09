import z from "zod";

export const CreateAddressSchema = z.object({
    mobileNumber : z.string().regex(/^(\+91)?-?[6-9]\d{9}$/, "Invalid mobile number"),
    addressLine: z.string().min(5, "Address line is too short"),
    city: z.string().min(2, "City name is too short"),
    state: z.string().min(2, "State name is too short"),
    postalCode : z.string().regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),
    country: z.string().min(2, "Country name is too short"),
});

export type CreateAddressInput = z.infer<typeof CreateAddressSchema>

export const AddressResponseSchema = z.object({
    id: z.string(),
    mobileNumber: z.string(),
    addressLine: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string()
});

