import jwt from 'jsonwebtoken'
import { ENV } from '../constants/env'

export const generateToken = (id: any) => {
    return jwt.sign({ id }, ENV.JWT_SECRET, { expiresIn: '1d' })
}