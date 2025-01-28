"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = void 0;
const success = (res, { data = {}, message = 'success', status = 200 }) => {
    return res.status(status).json({ message, data });
};
exports.success = success;
