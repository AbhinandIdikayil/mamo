import { IinterviewDoc } from "../model/inteviewModel";
import { IinterivewRepo } from "../interfaces/IRepo";
import { IinterviewService } from "../interfaces/IService";
import ErrorResponse from "../utils/ErrorResponse";


export class InterviewService implements IinterviewService {
    private repo: IinterivewRepo
    constructor(repo: IinterivewRepo) {
        this.repo = repo
    }
    async findAllInterview(): Promise<IinterviewDoc[]> {
        return await this.repo.findAll()
    }

    async scheduleInterview(data: { hrId: string; start: Date; end: Date; }): Promise<IinterviewDoc> {
        const existingInterview = await this.repo.findOne({ end: data.end, start: data.start })
        if (existingInterview) {
            throw ErrorResponse.badRequest('Interview already exist');
        }
        return await this.repo.create(data);
    }
    async deleteInterview(id: string): Promise<boolean> {
        const result = await this.repo.deleteOne(id);
        if (result) {
            return true
        } else {
            throw ErrorResponse.badRequest('Cannot find timeslot')
        }
    }
    async updateInterview(data: { id: string; title: string; start: Date; end: Date; }): Promise<IinterviewDoc> {
        const result = await this.repo.findByid(data.id)
        if (!result) {
            throw ErrorResponse.badRequest('Cannot find timeslot')
        }
        result.start = data.start;
        result.end = data.end;
    
        // Save the updated interview to the database
        await result.save();
    
        // Return the updated interview document
        return result;
    }
}