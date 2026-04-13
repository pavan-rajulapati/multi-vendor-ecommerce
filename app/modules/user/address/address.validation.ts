import z from "zod";

export const CreateAddressSchema = z.object({
    firstName : z.string().min(2, "name is too short"),
    lastName : z.string().min(2, "name is too short"),
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
    firstName : z.string(),
    lastName : z.string(),
    mobileNumber: z.string(),
    addressLine: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string()
});

export const UpdateAddressInputSchema = z.object({
    id: z.string().optional(),
    firstName : z.string().optional(),
    lastName : z.string().optional(),
    mobileNumber: z.string().optional(),
    addressLine: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional()
});

export type UpdateUserInput = z.infer<typeof UpdateAddressInputSchema>;

