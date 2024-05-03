import { Roles } from "@/domain/interfaces/roles.enum";
import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string(),
  company: z.string().min(3).max(255),
  roles: z.array(z.enum([Roles.Admin, Roles.Manager, Roles.User])),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignUpDto = z.infer<typeof signUpSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
