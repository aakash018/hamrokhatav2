"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debtsServices = void 0;
const db_1 = require("../../db/db");
const drizzle_orm_1 = require("drizzle-orm");
const getAllDebts = async () => {
    const rawSQL = (0, drizzle_orm_1.sql) `
  SELECT
      debts.id AS debt_id,
      debts.amount,
      from_member.name AS from_member_name,
      to_member.name AS to_member_name
  FROM debts
  JOIN members AS from_member ON debts.from = from_member.id
  JOIN members AS to_member ON debts.to = to_member.id;
`;
    const results = await db_1.db.execute(rawSQL);
    return results.rows;
};
exports.debtsServices = {
    getAllDebts,
};
//# sourceMappingURL=debts.service.js.map