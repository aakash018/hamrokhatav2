import express from "express";

import { debtsController } from "../controller/debts.controller";
const router = express.Router();

router.get("/getAll", debtsController.getAllDebts);

export { router as debtsRouter };
