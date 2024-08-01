"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db/db");
const migrations_1 = require("./db/migrations");
const app_router_1 = __importDefault(require("./api/router/app-router"));
const app_error_handle_1 = require("./api/middleware/app-error-handle");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const main = async () => {
    await db_1.client.connect().catch((err) => {
        console.error("Database Connected", err);
        process.exit();
    });
    console.log("Database Connected");
    await (0, migrations_1.runMigrations)().catch((err) => {
        console.error("Error running latest migrations", err);
        process.exit();
    });
    console.log("Latest migrations ran");
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use("/api", app_router_1.default);
    app.use(app_error_handle_1.appErrorHandler);
    app.listen(PORT, () => {
        console.log("SERVER IS RUNNING at", PORT);
    });
};
main();
//# sourceMappingURL=index.js.map