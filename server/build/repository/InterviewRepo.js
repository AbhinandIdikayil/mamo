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
exports.InterviewRepo = void 0;
const inteviewModel_1 = require("../model/inteviewModel");
class InterviewRepo {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield inteviewModel_1.interviewModel.create(data);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield inteviewModel_1.interviewModel.find();
        });
    }
    findOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield inteviewModel_1.interviewModel.findOne({
                start: data.start,
                end: data.end
            }).exec();
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield inteviewModel_1.interviewModel.findByIdAndDelete(id);
            return result ? true : false;
        });
    }
    findByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield inteviewModel_1.interviewModel.findById(id);
        });
    }
}
exports.InterviewRepo = InterviewRepo;
