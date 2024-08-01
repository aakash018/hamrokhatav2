"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.membersController = void 0;
const createEndpoint_1 = require("../../utilities/createEndpoint");
const members_services_1 = require("../services/members.services");
const getAllMembers = (0, createEndpoint_1.createEndpoint)()(async (_, res) => {
    const members = await members_services_1.membersServices.findALlMembers();
    return res.json({
        status: 200,
        members,
    });
});
exports.membersController = {
    getAllMembers,
};
//# sourceMappingURL=members.controller.js.map