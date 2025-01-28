import { signupData } from "types/hr"
import { IRepo } from "../interfaces/IRepo"
import { HrDoc, HrModel } from "../model/HrModel"



export class HrRepository implements IRepo {
    async create(data: signupData): Promise<HrDoc> {
        return await HrModel.create(data)
    }
    async findOne(email: string): Promise<HrDoc | null> {
        return await HrModel.findOne({email})
    }
}