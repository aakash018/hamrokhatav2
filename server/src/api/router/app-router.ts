import express from "express";
import { expenditureRouter } from "./expenditure-route";
import { membersRouter } from "./members-router";
import { debtsRouter } from "./debts.router";
import { personalPaymentRouter } from "./personalPayment";
const router = express.Router();

router.use("/expenditure", expenditureRouter);
router.use("/members", membersRouter);
router.use("/debts", debtsRouter);
router.use("/personalPayment", personalPaymentRouter);

export default router;
