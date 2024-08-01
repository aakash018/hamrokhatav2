"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debts = exports.expenditure = exports.members = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.members = (0, pg_core_1.pgTable)("members", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    profileUrl: (0, pg_core_1.text)("profile_url"),
});
exports.expenditure = (0, pg_core_1.pgTable)("expenditure", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    amount: (0, pg_core_1.doublePrecision)("amount").notNull(),
    paidBy: (0, pg_core_1.integer)("paid_by").references(() => exports.members.id),
    remarks: (0, pg_core_1.text)("description").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.debts = (0, pg_core_1.pgTable)("debts", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    from: (0, pg_core_1.integer)("from")
        .references(() => exports.members.id)
        .notNull(),
    to: (0, pg_core_1.integer)("to")
        .references(() => exports.members.id)
        .notNull(),
    amount: (0, pg_core_1.doublePrecision)("amount").notNull().default(0),
});
//# sourceMappingURL=schema.js.map