"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.NotFoundError = exports.UnauthorizedError = exports.BadRequestError = exports.AppHttpError = void 0;
class AppHttpError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.AppHttpError = AppHttpError;
class BadRequestError extends AppHttpError {
    constructor(message, errors = []) {
        super(message);
        this.name = "Bad Request";
        this.status = 400;
        this.errors = errors;
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends AppHttpError {
    constructor(message, errors = []) {
        super(message);
        this.name = "Unauthorized";
        this.status = 401;
        this.errors = errors;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class NotFoundError extends AppHttpError {
    constructor(message, errors = []) {
        super(message);
        this.name = "Not Found";
        this.status = 404;
        this.errors = errors;
    }
}
exports.NotFoundError = NotFoundError;
class ForbiddenError extends AppHttpError {
    constructor(message, errors = []) {
        super(message);
        this.name = "Forbidden";
        this.status = 403;
        this.errors = errors;
    }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=custom-errors.js.map