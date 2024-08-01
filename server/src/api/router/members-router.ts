import express from "express";
import { membersController } from "../controller/members.controller";

const router = express.Router();

router.get("/getAll", membersController.getAllMembers);

export { router as membersRouter };
