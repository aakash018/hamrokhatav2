"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debtsRouter = void 0;
const express_1 = __importDefault(require("express"));
const debts_controller_1 = require("../controller/debts.controller");
const router = express_1.default.Router();
exports.debtsRouter = router;
router.get("/getAll", debts_controller_1.debtsController.getAllDebts);
//# sourceMappingURL=debts.router.js.map