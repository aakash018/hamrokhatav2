"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExprenditureSchema = void 0;
const zod_1 = require("zod");
exports.createExprenditureSchema = zod_1.z.object({
    amount: zod_1.z.coerce.number().min(1),
    paidBy: zod_1.z.number(),
    remarks: zod_1.z.string().min(1),
});
//# sourceMappingURL=create-exprenditure.js.map