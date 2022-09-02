"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    res.status(status).send(message);
};
exports.default = errorMiddleware;
