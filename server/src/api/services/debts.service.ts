import { db } from "../../db/db";
import { sql } from "drizzle-orm";

const getAllDebts = async () => {
  const rawSQL = sql`
  SELECT
      debts.id AS debt_id,
      debts.amount,
      from_member.name AS from_member_name,
      to_member.name AS to_member_name
  FROM debts
  JOIN members AS from_member ON debts.from = from_member.id
  JOIN members AS to_member ON debts.to = to_member.id;
`;

  const results = await db.execute(rawSQL);

  return results.rows;
};

export const debtsServices = {
  getAllDebts,
};
