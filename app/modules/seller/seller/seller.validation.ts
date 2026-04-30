import z from "zod";

export const SellerInputSchema = z.object({
    contactName : z.string().min(2, "name is too short"),
    mobileNumber : z.string().regex(/^(\+91)?-?[6-9]\d{9}$/),
    // status : z.enum(["PENDING", "APPROVED", "REJECTED", "SUSPENDED"]).optional(),
    // KycStatus : z.enum(["PENDING", "VERIFIED", "REJECTED"]).optional(),
})

export type SellerInputDTO = z.infer<typeof SellerInputSchema>