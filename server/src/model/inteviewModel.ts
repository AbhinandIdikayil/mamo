import { DB_enum } from "../constants/db";
import mongoose, { Document, Schema, Types } from "mongoose";


export interface IinterviewDoc extends Document {
    _id: Types.ObjectId | string,
    start: Date
    end: Date,
    hrId: Types.ObjectId,
    title: string
}

const interviewSchema = new Schema<IinterviewDoc>({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    title: { type: String, required: true },
    hrId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: DB_enum.HR_MODEL,
        required: false
    }
});

export const interviewModel = mongoose.model<IinterviewDoc>(DB_enum.INTERVIEW_MODEL, interviewSchema);