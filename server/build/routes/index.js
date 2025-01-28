"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const Controller_1 = require("../controller/Controller");
const express_1 = require("express");
const HrRepository_1 = require("../repository/HrRepository");
const Service_1 = require("../service/Service");
const InterviewRepo_1 = require("../repository/InterviewRepo");
const InterviewService_1 = require("../service/InterviewService");
const InterviewController_1 = require("../controller/InterviewController");
exports.router = (0, express_1.Router)();
const hrRepo = new HrRepository_1.HrRepository();
const service = new Service_1.Service(hrRepo);
const controller = new Controller_1.Controller(service);
const interviewRepo = new InterviewRepo_1.InterviewRepo();
const interviewService = new InterviewService_1.InterviewService(interviewRepo);
const interviewController = new InterviewController_1.InterviewController(interviewService);
exports.router.route('/signup').post(controller.login.bind(controller));
exports.router.route('/login').post(controller.login.bind(controller));
exports.router.route('/timeslots')
    .get(interviewController.listAllInterview.bind(interviewController))
    .post(interviewController.createInterview.bind(interviewController));
