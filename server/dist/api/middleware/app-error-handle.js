"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appErrorHandler = void 0;
const lodash_1 = __importDefault(require("lodash"));
const custom_errors_1 = require("../../utilities/custom-errors");
const appErrorHandler = (error, _req, res, ___) => {
    if (error && error instanceof custom_errors_1.AppHttpError) {
        const resPayload = {
            message: error.message,
            status: error.status,
        };
        if (!lodash_1.default.isEmpty(error.errors))
            resPayload.issues = error.errors;
        return res.status(error.status).json(resPayload);
    }
    if (error && error instanceof Error && "message" in error) {
        return res.status(500).json({ status: 500, message: error.message });
    }
    return res
        .status(500)
        .json({ status: 500, message: "Internal server error occurred" });
};
exports.appErrorHandler = appErrorHandler;
//# sourceMappingURL=app-error-handle.js.map