import { IinterviewDoc, interviewModel } from "../model/inteviewModel";
import { scheduleInterview } from "types/interview";
import { IinterivewRepo } from "../interfaces/IRepo";


export class InterviewRepo implements IinterivewRepo {
    async create(data: scheduleInterview): Promise<IinterviewDoc> {
        return await interviewModel.create(data)
    }
    async findAll(): Promise<IinterviewDoc[]> {
        return await interviewModel.find();
    }
    async findOne(data: { start: Date; end: Date; }): Promise<IinterviewDoc | null> {
        return await interviewModel.findOne({
            start: data.start,
            end: data.end
        }).exec();
    }
    async deleteOne(id: string): Promise<boolean> {
        const result = await interviewModel.findByIdAndDelete(id)
        return result ? true : false
    }
    async findByid(id: string): Promise<IinterviewDoc | null> {
        return await interviewModel.findById(id)
    }
}