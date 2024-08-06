"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenditureController = void 0;
const createEndpoint_1 = require("../../utilities/createEndpoint");
const create_exprenditure_1 = require("../validation-schema/create-exprenditure");
const exprenditure_service_1 = require("../services/exprenditure.service");
const createExprenditure = (0, createEndpoint_1.createEndpoint)({
    body: create_exprenditure_1.createExprenditureSchema,
})(async (req, res) => {
    await exprenditure_service_1.expenditureServices.createExprenditure(req.body);
    res.json({
        status: 200,
        message: "created",
    });
});
const createCustomeExprenditure = (0, createEndpoint_1.createEndpoint)({
    body: create_exprenditure_1.createCustomExpenditureSchema,
})(async (req, res) => {
    await exprenditure_service_1.expenditureServices.createCustomeExpenditure(req.body);
    res.json({
        status: 200,
        message: "created",
    });
});
const getAllExprenditure = (0, createEndpoint_1.createEndpoint)()(async (req, res) => {
    const { timeFrame } = req.query;
    console.log(timeFrame);
    const data = await exprenditure_service_1.expenditureServices.getExprenditureData(timeFrame);
    res.json({
        status: 200,
        message: "created",
        expenditure: data,
    });
});
exports.expenditureController = {
    createExprenditure,
    getAllExprenditure,
    createCustomeExprenditure,
};
//# sourceMappingURL=exprenditure.controller.js.map