import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  profileUrl: text("profile_url"),
});

export const expenditure = pgTable("expenditure", {
  id: serial("id").primaryKey(),
  amount: doublePrecision("amount").notNull(),
  paidBy: integer("paid_by").references(() => members.id), // Foreign key referencing members table
  remarks: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(), // Auto-generated created_at field
});

export const debts = pgTable("debts", {
  id: serial("id").primaryKey(),
  from: integer("from")
    .references(() => members.id)
    .notNull(), // Foreign key referencing members table
  to: integer("to")
    .references(() => members.id)
    .notNull(), // Foreign key referencing members table
  amount: doublePrecision("amount").notNull().default(0),
});
