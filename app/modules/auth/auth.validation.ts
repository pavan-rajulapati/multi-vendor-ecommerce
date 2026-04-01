import z from "zod";

export const SignupValidation = z.object({
    name : z.string().min(3, "Name must be at least 3 chars"),
    email : z.string().email(),
    password : z.string().min(8, "Password must be at least 8 chars")
})

export type SignupDTO = z.infer<typeof SignupValidation>;

export const SigninValidation = z.object({
    email : z.string().email(),
    password : z.string().min(8, "Password must be at least 8 chars")
})

export type SigninDTO = z.infer<typeof SigninValidation>