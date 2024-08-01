"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.membersRouter = void 0;
const express_1 = __importDefault(require("express"));
const members_controller_1 = require("../controller/members.controller");
const router = express_1.default.Router();
exports.membersRouter = router;
router.get("/getAll", members_controller_1.membersController.getAllMembers);
//# sourceMappingURL=members-router.js.map