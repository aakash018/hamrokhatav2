"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenditureServices = exports.getExprenditureData = exports.createExprenditure = void 0;
const schema_1 = require("../../db/schema");
const db_1 = require("../../db/db");
const drizzle_orm_1 = require("drizzle-orm");
const dayjs_1 = __importDefault(require("dayjs"));
const createExprenditure = async (data) => {
    await db_1.db.transaction(async (tx) => {
        await tx.insert(schema_1.expenditure).values(data);
        const prevDebts = await tx
            .select()
            .from(schema_1.debts)
            .where((0, drizzle_orm_1.eq)(schema_1.debts.from, data.paidBy));
        data.amount = data.amount / 4;
        prevDebts.forEach(async (debt) => {
            if (debt.amount === 0) {
                const reverseData = await db_1.db
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
        });
    });
};
exports.createExprenditure = createExprenditure;
const getExprenditureData = async (toDate) => {
    const requestedDate = (0, dayjs_1.default)().subtract(toDate, "days").toDate();
    const rawSQL = (0, drizzle_orm_1.sql) `SELECT
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
    const expData = await db_1.db.execute(rawSQL);
    return expData.rows;
};
exports.getExprenditureData = getExprenditureData;
const createCustomeExpenditure = async (data) => {
    await db_1.db.transaction(async (tx) => {
        await tx.insert(schema_1.expenditure).values(data);
        const prevDebts = await tx
            .select()
            .from(schema_1.debts)
            .where((0, drizzle_orm_1.eq)(schema_1.debts.from, data.paidBy));
        data.amount = data.amount / (4 - data.frozenAccounts.length);
        prevDebts.forEach(async (debt) => {
            if (data.frozenAccounts.includes(debt.to))
                return null;
            if (debt.amount === 0) {
                const reverseData = await db_1.db
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
            return null;
        });
    });
};
exports.expenditureServices = {
    createExprenditure: exports.createExprenditure,
    getExprenditureData: exports.getExprenditureData,
    createCustomeExpenditure,
};
//# sourceMappingURL=exprenditure.service.js.map