import { z } from "zod";

export const createExprenditureSchema = z.object({
  amount: z.coerce.number().min(1),
  paidBy: z.number(),
  remarks: z.string().min(1),
});

export const createCustomExpenditureSchema = z.object({
  amount: z.coerce.number().min(1),
  paidBy: z.number(),
  remarks: z.string().min(1),
  frozenAccounts: z.array(z.number()).min(1),
});

export type CreateCustomExprenditureSchema = z.infer<
  typeof createCustomExpenditureSchema
>;
export type CreateExprenditureSchema = z.infer<typeof createExprenditureSchema>;
