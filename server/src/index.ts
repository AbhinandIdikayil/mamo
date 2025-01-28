import { router } from './routes/index';
import { ENV } from './constants/env';
import express from 'express'
import { connectDB } from './config/db';
import cors from 'cors'
import { errorHandler } from './middlewares/errorMiddlware';
const app = express()

app.use(express.json());
app.use(cors({
    origin: ENV.CLIENT, // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
    credentials: true // Allow cookies to be sent with requests
}))
app.use('/api', router)
app.use(errorHandler)
let intervalId:any;
const fetchApiData = async () => {
    try {
        const response = await fetch("https://mamo.onrender.com/api/timeslots");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log("API Response:", response.status);
    } catch (error) {
        console.error("Error fetching API data:", error);
    }
};

intervalId = setInterval(fetchApiData, 14000);

app.listen(ENV.PORT, async () => {
    await connectDB()
    console.log('Server is listening on port:', ENV.PORT)
}) 