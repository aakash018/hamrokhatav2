"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personalPaymentFormSchema = void 0;
const zod_1 = require("zod");
exports.personalPaymentFormSchema = zod_1.z.object({
    amount: zod_1.z.coerce.number().min(1),
    paidBy: zod_1.z.number(),
    paidTo: zod_1.z.number(),
});
//# sourceMappingURL=create-personalPayment.js.map