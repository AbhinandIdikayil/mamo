"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
const generateToken_1 = require("../utils/generateToken");
const success_1 = require("../utils/success");
const login_1 = require("../utils/validator/login");
const signup_1 = require("../utils/validator/signup");
class Controller {
    constructor(service) {
        this.service = service;
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = signup_1.signupValidation.validate(req.body);
                if (error) {
                    console.log(error === null || error === void 0 ? void 0 : error.message);
                    throw ErrorResponse_1.default.badRequest((error === null || error === void 0 ? void 0 : error.message) || 'Invalid request data');
                }
                const data = yield this.service.signup(value);
                return (0, success_1.success)(res, { data });
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = login_1.loginValidator.validate(req.body);
                if (error) {
                    console.log(error === null || error === void 0 ? void 0 : error.message);
                    throw ErrorResponse_1.default.badRequest((error === null || error === void 0 ? void 0 : error.message) || 'Invalid request data');
                }
                const data = yield this.service.login(value);
                const token = (0, generateToken_1.generateToken)(data.id);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.Controller = Controller;
