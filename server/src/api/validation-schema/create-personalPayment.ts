import { z } from "zod";

export const personalPaymentFormSchema = z.object({
  amount: z.coerce.number().min(1),
  paidBy: z.number(),
  paidTo: z.number(),
});

export type PersonalPaymentFormSchema = z.infer<
  typeof personalPaymentFormSchema
>;
