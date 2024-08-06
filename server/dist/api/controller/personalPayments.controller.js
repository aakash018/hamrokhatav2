"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalPaymentController = void 0;
const createEndpoint_1 = require("../../utilities/createEndpoint");
const personalPayments_service_1 = require("../services/personalPayments.service");
const create_personalPayment_1 = require("../validation-schema/create-personalPayment");
const createPersonalPayment = (0, createEndpoint_1.createEndpoint)({
    body: create_personalPayment_1.personalPaymentFormSchema,
})(async (req, res) => {
    await personalPayments_service_1.personalPaymentsServices.create(req.body);
    return res.json({
        status: 200,
        message: "payment made",
    });
});
exports.personalPaymentController = {
    createPersonalPayment,
};
//# sourceMappingURL=personalPayments.controller.js.map