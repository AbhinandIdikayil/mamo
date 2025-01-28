import mongoose, { Document, Schema, Types } from 'mongoose'
import bcrypt from 'bcrypt'
import { DB_enum } from '../constants/db';


export interface HrDoc extends Document {
    _id: Types.ObjectId | string,
    name: string
    email: string,
    password: string,
    matchPassword(enteredPassword: string): Promise<boolean>,
}


const hrSchema = new Schema<HrDoc>({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

hrSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}


hrSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

export const HrModel = mongoose.model<HrDoc>(DB_enum.HR_MODEL, hrSchema);