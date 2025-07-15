import { z } from "zod";

const passwordRequirements = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);
    const noAccents = /^[\x00-\x7F]*$/.test(password);

    return hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSymbol && noAccents;
};

export const loginSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters."),
    password: z.string().min(8, "Password must be 8+ characters."),
});

export const signupSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z.string().refine(passwordRequirements, {
        message:
            "Password must be 8+ chars with uppercase, lowercase, number, and symbol (no accents).",
    }),
    agreeTerms: z.boolean().refine((val) => val === true, {
        message: "You must accept the Terms of Use",
    }),
    agreeGuidelines: z.boolean().refine((val) => val === true, {
        message: "You must accept the Earnverse Guidelines",
    }),
});

export const stepOneSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: "First name must be at least 2 characters" }),
    lastName: z
        .string()
        .min(2, { message: "Last name must be at least 2 characters" }),
});
