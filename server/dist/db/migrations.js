"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrations = void 0;
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const runMigrations = () => {
    return (0, migrator_1.migrate)(db_1.db, {
        migrationsFolder: path_1.default.resolve("./drizzle"),
    });
};
exports.runMigrations = runMigrations;
//# sourceMappingURL=migrations.js.map