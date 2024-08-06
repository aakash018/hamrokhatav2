"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalPaymentsServices = void 0;
const db_1 = require("../../db/db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../../db/schema");
const create = async (data) => {
    await db_1.db.transaction(async (tx) => {
        const prevDebts = await tx
            .select()
            .from(schema_1.debts)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.debts.from, data.paidBy), (0, drizzle_orm_1.eq)(schema_1.debts.to, data.paidTo)));
        const debt = prevDebts[0];
        if (debt.amount === 0) {
            const reverseData = await tx
                .select({ amount: schema_1.debts.amount })
                .from(schema_1.debts)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.debts.from, debt.to), (0, drizzle_orm_1.eq)(schema_1.debts.to, debt.from)));
            const lastAmount = reverseData[0].amount;
            await tx
                .update(schema_1.debts)
                .set({
                amount: data.amount + lastAmount,
            })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.debts.from, debt.to), (0, drizzle_orm_1.eq)(schema_1.debts.to, debt.from)));
        }
        else {
            const sub = debt.amount - data.amount;
            if (sub >= 0) {
                await tx
                    .update(schema_1.debts)
                    .set({
                    amount: sub,
                })
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.debts.from, debt.from), (0, drizzle_orm_1.eq)(schema_1.debts.to, debt.to)));
            }
            else {
                await tx
                    .update(schema_1.debts)
                    .set({
                    amount: Math.abs(sub),
                })
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.debts.from, debt.to), (0, drizzle_orm_1.eq)(schema_1.debts.to, debt.from)));
                await tx
                    .update(schema_1.debts)
                    .set({
                    amount: 0,
                })
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.debts.from, debt.from), (0, drizzle_orm_1.eq)(schema_1.debts.to, debt.to)));
            }
        }
        await tx.insert(schema_1.personalPayments).values({
            from: data.paidBy,
            to: data.paidTo,
            amount: data.amount,
        });
    });
};
exports.personalPaymentsServices = {
    create,
};
//# sourceMappingURL=personalPayments.service.js.map