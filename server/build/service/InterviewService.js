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
exports.InterviewService = void 0;
const ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
class InterviewService {
    constructor(repo) {
        this.repo = repo;
    }
    findAllInterview() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.findAll();
        });
    }
    scheduleInterview(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingInterview = yield this.repo.findOne({ end: data.end, start: data.start });
            if (existingInterview) {
                throw ErrorResponse_1.default.badRequest('Interview already exist');
            }
            return yield this.repo.create(data);
        });
    }
}
exports.InterviewService = InterviewService;
