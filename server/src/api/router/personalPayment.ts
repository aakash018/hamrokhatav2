import express from "express";
import { personalPaymentController } from "../controller/personalPayments.controller";

const router = express.Router();

router.post("/create", personalPaymentController.createPersonalPayment);

export { router as personalPaymentRouter };
