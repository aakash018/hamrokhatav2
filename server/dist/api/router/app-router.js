"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expenditure_route_1 = require("./expenditure-route");
const members_router_1 = require("./members-router");
const debts_router_1 = require("./debts.router");
const personalPayment_1 = require("./personalPayment");
const router = express_1.default.Router();
router.use("/expenditure", expenditure_route_1.expenditureRouter);
router.use("/members", members_router_1.membersRouter);
router.use("/debts", debts_router_1.debtsRouter);
router.use("/personalPayment", personalPayment_1.personalPaymentRouter);
exports.default = router;
//# sourceMappingURL=app-router.js.map