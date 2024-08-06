import { db } from "../../db/db";
import { eq, and } from "drizzle-orm";
import { PersonalPaymentFormSchema } from "../validation-schema/create-personalPayment";
import { debts, personalPayments } from "../../db/schema";

// const getAllDebts = async () => {
//   const rawSQL = sql`
//   SELECT
//       debts.id AS debt_id,
//       debts.amount,
//       from_member.name AS from_member_name,
//       to_member.name AS to_member_name
//   FROM debts
//   JOIN members AS from_member ON debts.from = from_member.id
//   JOIN members AS to_member ON debts.to = to_member.id;
// `;

//   const results = await db.execute(rawSQL);

//   return results.rows;
// };

const create = async (data: PersonalPaymentFormSchema) => {
  await db.transaction(async (tx) => {
    const prevDebts = await tx
      .select()
      .from(debts)
      .where(and(eq(debts.from, data.paidBy), eq(debts.to, data.paidTo)));

    const debt = prevDebts[0];

    if (debt.amount === 0) {
      const reverseData = await tx
        .select({ amount: debts.amount })
        .from(debts)
        .where(and(eq(debts.from, debt.to), eq(debts.to, debt.from)));

      const lastAmount = reverseData[0].amount;

      await tx
        .update(debts)
        .set({
          amount: data.amount + lastAmount,
        })
        .where(and(eq(debts.from, debt.to), eq(debts.to, debt.from)));
    } else {
      const sub = debt.amount - data.amount;

      if (sub >= 0) {
        await tx
          .update(debts)
          .set({
            amount: sub,
          })
          .where(and(eq(debts.from, debt.from), eq(debts.to, debt.to)));
      } else {
        await tx
          .update(debts)
          .set({
            amount: Math.abs(sub),
          })
          .where(and(eq(debts.from, debt.to), eq(debts.to, debt.from)));

        await tx
          .update(debts)
          .set({
            amount: 0,
          })
          .where(and(eq(debts.from, debt.from), eq(debts.to, debt.to)));
      }
    }

    await tx.insert(personalPayments).values({
      from: data.paidBy,
      to: data.paidTo,
      amount: data.amount,
    });
  });
};

export const personalPaymentsServices = {
  //   getAllDebts,
  create,
};
