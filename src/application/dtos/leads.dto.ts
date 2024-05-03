import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string(),
  address: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  funnelId: z.string(),
  state: z.enum(["new", "contacted", "qualified", "lost", "sold"]),
});

export type CreateLeadDto = z.infer<typeof createLeadSchema>;

export const updateLeadSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  state: z.enum(["new", "contacted", "qualified", "lost", "sold"]).optional(),
});

export type UpdateLeadDto = z.infer<typeof updateLeadSchema>;
