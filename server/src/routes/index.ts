import { Controller } from '../controller/Controller';
import { Router } from 'express'
import { HrRepository } from '../repository/HrRepository'
import { Service } from '../service/Service';
import { InterviewRepo } from '../repository/InterviewRepo';
import { InterviewService } from '../service/InterviewService';
import { InterviewController } from '../controller/InterviewController';
export const router = Router()


const hrRepo = new HrRepository();
const service = new Service(hrRepo)
const controller = new Controller(service)

const interviewRepo = new InterviewRepo()
const interviewService = new InterviewService(interviewRepo)
const interviewController = new InterviewController(interviewService)

router.route('/signup').post(controller.login.bind(controller));
router.route('/login').post(controller.login.bind(controller));


router.route('/timeslots')
    .get(interviewController.listAllInterview.bind(interviewController))
    .post(interviewController.createInterview.bind(interviewController))
    .delete(interviewController.delete.bind(interviewController))
    .put(interviewController.update.bind(interviewController))
