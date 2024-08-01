import { migrate } from "drizzle-orm/node-postgres/migrator";

import path from "path";
import { db } from "./db";

export const runMigrations = () => {
  return migrate(db, {
    migrationsFolder: path.resolve("./drizzle"),
  });
};
