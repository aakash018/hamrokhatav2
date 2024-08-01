"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEndpoint = void 0;
const custom_errors_1 = require("./custom-errors");
const createEndpoint = (schemas = null) => (callback) => async (req, res, next) => {
    try {
        if (schemas) {
            if (schemas.param) {
                const param = schemas.param.safeParse(req.params);
                if (!param.success)
                    throw new custom_errors_1.BadRequestError("Invalid parameters detected", param.error.issues);
                req.params = param.data;
            }
            if (schemas.query) {
                const query = schemas.query.safeParse(req.query);
                if (!query.success)
                    throw new custom_errors_1.BadRequestError("Invalid query detected", query.error.issues);
                req.query = query.data;
            }
            if (schemas.body) {
                const body = schemas.body.safeParse(req.body);
                if (!body.success)
                    throw new custom_errors_1.BadRequestError("Invalid body detected", body.error.issues);
                req.body = body.data;
            }
        }
        return await callback(req, res, next);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};
exports.createEndpoint = createEndpoint;
//# sourceMappingURL=createEndpoint.js.map