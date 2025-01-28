import { NextFunction, Request, Response } from "express";
import { IinterviewService } from "../interfaces/IService";
import { success } from "../utils/success";
import ErrorResponse from "../utils/ErrorResponse";


export class InterviewController {
    private service: IinterviewService
    constructor(service: IinterviewService) {
        this.service = service
    }

    async createInterview(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.scheduleInterview(req.body);

            return success(res, { data });
        } catch (error) {
            next(error)
        }
    }

    async listAllInterview(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.service.findAllInterview()
            return success(res, { data });
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.query.id) {
                throw ErrorResponse.badRequest('id is not provided')
            }
            const params = {
                id: req.query.id,
                ...req.body
            }
            const data = await this.service.updateInterview(params)
            return success(res, { data });
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req?.query?.id) {
                throw ErrorResponse.badRequest('id is not provided')
            }
            const data = await this.service.deleteInterview(req?.query?.id as string)
            return success(res, { data });
        } catch (error) {
            next(error)
        }
    }

}