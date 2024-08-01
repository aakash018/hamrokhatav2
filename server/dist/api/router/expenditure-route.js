"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenditureRouter = void 0;
const express_1 = __importDefault(require("express"));
const exprenditure_controller_1 = require("../controller/exprenditure.controller");
const router = express_1.default.Router();
exports.expenditureRouter = router;
router.post("/create", exprenditure_controller_1.expenditureController.createExprenditure);
router.get("/getAll", exprenditure_controller_1.expenditureController.getAllExprenditure);
//# sourceMappingURL=expenditure-route.js.map