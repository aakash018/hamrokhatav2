import { z } from "zod";

export const createExprenditureSchema = z.object({
  amount: z.coerce.number().min(1),
  paidBy: z.number(),
  remarks: z.string().min(1),
});

export type CreateExprenditureSchema = z.infer<typeof createExprenditureSchema>;
