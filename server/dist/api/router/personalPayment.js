"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalPaymentRouter = void 0;
const express_1 = __importDefault(require("express"));
const personalPayments_controller_1 = require("../controller/personalPayments.controller");
const router = express_1.default.Router();
exports.personalPaymentRouter = router;
router.post("/create", personalPayments_controller_1.personalPaymentController.createPersonalPayment);
//# sourceMappingURL=personalPayment.js.map