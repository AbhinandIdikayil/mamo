import { HrDoc } from "model/HrModel";
import { IinterviewDoc } from "model/inteviewModel";
import { signupData } from "types/hr";
import { scheduleInterview } from "types/interview";



export interface IRepo {
    findOne(email: string): Promise<HrDoc | null>
    create(data: signupData): Promise<HrDoc>
}

type findInterview = {
    start: Date
    end: Date,
}

type updateInterview = {
    start: Date
    end: Date,
    title: string
}
export interface IinterivewRepo {
    findOne(data: findInterview): Promise<IinterviewDoc | null>
    findAll(): Promise<IinterviewDoc[]>
    create(data: scheduleInterview): Promise<IinterviewDoc>
    // update(data: updateInterview): Promise<IinterviewDoc>
    deleteOne(id: string): Promise<boolean>
    findByid(id: string): Promise<IinterviewDoc | null>

}
