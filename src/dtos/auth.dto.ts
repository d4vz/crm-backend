import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignUpDto = z.infer<typeof signUpSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
