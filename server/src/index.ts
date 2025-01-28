import { router } from './routes/index';
import { ENV } from './constants/env';
import express from 'express'
import { connectDB } from './config/db';
import cors from 'cors'
const app = express()

app.use(express.json());
app.use(cors({
    origin: ENV.CLIENT, // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
    credentials: true // Allow cookies to be sent with requests
}))
app.use('/api', router)

app.listen(ENV.PORT, async () => {
    await connectDB()
    console.log('Server is listening on port:', ENV.PORT)
})