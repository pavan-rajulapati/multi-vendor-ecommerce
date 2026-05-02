import z from "zod";

export const SellerDetailsInputSchema = z.object({
    businessName : z.string().min(2, "name is too short"),
    storeName : z.string().min(2, "name is too short"),
    GSTIN : z.string().length(15).regex(/^\d{2}[A-Z0-9]{10}\d{1}Z[A-Z]{1}$/),
    PAN : z.string().length(10).regex(/^[A-Z]{3}[PCF][A-Z]\d{4}[A-Z]$/)
})

export type SellerDetailsInputDTO = z.infer<typeof SellerDetailsInputSchema>
