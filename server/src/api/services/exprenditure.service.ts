import {
  CreateCustomExprenditureSchema,
  CreateExprenditureSchema,
} from "../validation-schema/create-exprenditure";
import { debts, expenditure } from "../../db/schema";
import { db } from "../../db/db";
import { and, eq, sql } from "drizzle-orm";

import dayjs from "dayjs";

export const createExprenditure = async (data: CreateExprenditureSchema) => {
  await db.transaction(async (tx) => {
    await tx.insert(expenditure).values(data);

    const prevDebts = await tx
      .select()
      .from(debts)
      .where(eq(debts.from, data.paidBy));

    data.amount = data.amount / 4;

    prevDebts.forEach(async (debt) => {
      if (debt.amount === 0) {
        const reverseData = await db
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
    });
  });
};

export const getExprenditureData = async (toDate: number) => {
  const requestedDate = dayjs().subtract(toDate, "days").toDate();

  const rawSQL = sql`SELECT
                    TO_CHAR(DATE_TRUNC('month', created_at), 'MM-DD-YYYY') AS MONTH,
                    SUM(amount) AS total_amount,
                  json_agg(
                        JSON_BUILD_OBJECT(
                                'id',
                                expenditure.id,
                                'description',
                                expenditure.description,
                                'amount',
                                expenditure.amount,
                                'date',
                                 expenditure.created_at,
                                'member',
                                members.name,
                                'profile',
                                members.profile_url
                              )
                    ) AS expenditure_list
                  FROM
                    expenditure
                    LEFT JOIN members ON expenditure.paid_by = members.id
                  WHERE created_at >= ${requestedDate}
                  GROUP BY
                    MONTH
                  ORDER BY
                    MONTH DESC;`;

  const expData = await db.execute(rawSQL);

  return expData.rows;
};

const createCustomeExpenditure = async (
  data: CreateCustomExprenditureSchema
) => {
  await db.transaction(async (tx) => {
    await tx.insert(expenditure).values(data);

    const prevDebts = await tx
      .select()
      .from(debts)
      .where(eq(debts.from, data.paidBy));

    data.amount = data.amount / (4 - data.frozenAccounts.length);

    prevDebts.forEach(async (debt) => {
      if (data.frozenAccounts.includes(debt.to)) return null;

      if (debt.amount === 0) {
        const reverseData = await db
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
      return null;
    });
  });
};

export const expenditureServices = {
  createExprenditure,
  getExprenditureData,
  createCustomeExpenditure,
};
