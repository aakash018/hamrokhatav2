import express from "express";
import { expenditureController } from "../controller/exprenditure.controller";
const router = express.Router();

router.post("/create", expenditureController.createExprenditure);
router.get("/getAll", expenditureController.getAllExprenditure);
router.post("/createCustom", expenditureController.createCustomeExprenditure);

export { router as expenditureRouter };
