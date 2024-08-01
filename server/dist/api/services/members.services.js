"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.membersServices = void 0;
const db_1 = require("../../db/db");
const schema_1 = require("../../db/schema");
const findALlMembers = async () => {
    return await db_1.db.select().from(schema_1.members);
};
exports.membersServices = {
    findALlMembers,
};
//# sourceMappingURL=members.services.js.map