import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/ErrorResponse";
import { generateToken } from "../utils/generateToken";
import { success } from "../utils/success";
import { loginValidator } from "../utils/validator/login";
import { signupValidation } from "../utils/validator/signup";
import { IService } from "../interfaces/IService";



export class Controller {
    private service: IService
    constructor(service: IService) {
        this.service = service
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = signupValidation.validate(req.body);
            if (error) {
                console.log(error?.message)
                throw ErrorResponse.badRequest(error?.message || 'Invalid request data');
            }
            const data = await this.service.signup(value)

            return success(res, { data })
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = loginValidator.validate(req.body)
            if (error) {
                console.log(error?.message)
                throw ErrorResponse.badRequest(error?.message || 'Invalid request data');
            }
            const data = await this.service.login(value);

            const token = generateToken(data.id)
        } catch (error) {
            next(error)
        }
    }
}