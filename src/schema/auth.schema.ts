import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(20, { message: "Name must be less than 20 characters" }),
  email: z.email({ message: "Your Email is Invalid " }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be less than 20 characters" }),
});
export const loginSchema = z.object({
  email: z.email({ message: "Your Email is Invalid " }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(20, { message: "Password must be less than 20 characters" }),
});
export type loginInput = z.infer<typeof loginSchema>;
export type registerInput = z.infer<typeof registerSchema>;
