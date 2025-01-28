import { HrDoc } from "model/HrModel"
import { IinterviewDoc } from "model/inteviewModel"
import { loginData, signupData } from "types/hr"



export interface IService {
    signup(data: signupData): Promise<HrDoc>
    login(data: loginData): Promise<{ id: string }>
}


type scheduleInterview = {
    hrId: string,
    start: Date
    end: Date,
}

type updateInterview = {
    id: string
    title: string,
    start: Date
    end: Date,
}


export interface IinterviewService {
    scheduleInterview(data: scheduleInterview): Promise<IinterviewDoc>
    findAllInterview(): Promise<IinterviewDoc[]>
    updateInterview(data: updateInterview): Promise<IinterviewDoc>
    deleteInterview(id: string): Promise<boolean>
}


