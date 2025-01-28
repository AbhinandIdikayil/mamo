import { IRepo } from "interfaces/IRepo";
import { IService } from "interfaces/IService";
import { HrDoc } from "model/HrModel";
import { loginData, signupData } from "types/hr";
import ErrorResponse from "../utils/ErrorResponse";



export class Service implements IService {
    private repo: IRepo
    constructor(repo: IRepo) {
        this.repo = repo
    }
    async login(data: loginData): Promise<{ id: string }> {
        const existingHr = await this.repo.findOne(data.email);
        if (!existingHr) {
            throw ErrorResponse.badRequest('No users found')

        }
        const password = await existingHr.matchPassword(data.password)
        if (password) {
            throw ErrorResponse.badRequest('Password is incorrec')
        }
        return { id: existingHr._id.toString() }
    }
    async signup(data: signupData): Promise<HrDoc> {
        return await this.repo.create(data)
    }
}