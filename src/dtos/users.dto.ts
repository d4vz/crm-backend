import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(9),
  company: z.string(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(9).optional(),
  company: z.string().optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
