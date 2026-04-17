import z from "zod";

export const BankAccountInputSchema = z.object({
    holderName :  z.string().min(2, "name is too short"),
    accountNumber: z.string().regex(/^[0-9]{9,18}$/, "Account number must be between 9 and 18 digits"),
    ifscCode: z.string()
        .length(11, "IFSC code must be exactly 11 characters")
        .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC format (e.g., SBIN0123456)")
})

export type BankAccountInputDTO = z.infer<typeof BankAccountInputSchema>

export const UpdateBankAccountInputSchema = z.object({
    holderName :  z.string().optional(),
    accountNumber: z.string().optional(),
    ifscCode: z.string().optional()
})

export type UpdateBankAccountInputDTO = z.infer<typeof UpdateBankAccountInputSchema>