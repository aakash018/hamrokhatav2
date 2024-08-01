import express from "express";
import { client } from "./db/db";
import { runMigrations } from "./db/migrations";
import appRouter from "./api/router/app-router";
import { appErrorHandler } from "./api/middleware/app-error-handle";
import cors from "cors";

// import { runMigrations } from "./db/migrations";

const app = express();
const PORT = process.env.PORT;

const main = async () => {
  await client.connect().catch((err) => {
    console.error("Database Connected", err);
    process.exit();
  });
  console.log("Database Connected");
  await runMigrations().catch((err) => {
    console.error("Error running latest migrations", err);
    process.exit();
  });
  console.log("Latest migrations ran");

  app.use(express.json());
  app.use(cors());
  app.use("/api", appRouter);

  app.use(appErrorHandler);

  app.listen(PORT, () => {
    console.log("SERVER IS RUNNING at", PORT);
  });
};

main();
