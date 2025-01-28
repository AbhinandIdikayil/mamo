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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewController = void 0;
const success_1 = require("../utils/success");
class InterviewController {
    constructor(service) {
        this.service = service;
    }
    createInterview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.scheduleInterview(req.body);
                return (0, success_1.success)(res, { data });
            }
            catch (error) {
                next(error);
            }
        });
    }
    listAllInterview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.service.findAllInterview();
                return (0, success_1.success)(res, { data });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.InterviewController = InterviewController;
