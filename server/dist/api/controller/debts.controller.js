"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debtsController = void 0;
const createEndpoint_1 = require("../../utilities/createEndpoint");
const debts_service_1 = require("../services/debts.service");
const getAllDebts = (0, createEndpoint_1.createEndpoint)()(async (_, res) => {
    const data = await debts_service_1.debtsServices.getAllDebts();
    return res.json({
        status: 200,
        debts: data,
    });
});
exports.debtsController = {
    getAllDebts,
};
//# sourceMappingURL=debts.controller.js.map