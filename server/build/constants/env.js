"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.ENV = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
    CLIENT: process.env.CLIENT
};
