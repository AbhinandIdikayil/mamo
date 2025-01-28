import { interviewModel } from "../model/inteviewModel";
import mongoose from "mongoose";
import { connectDB } from "../config/db";

// Connect to MongoDB

// Get today's date
const today = new Date();
const today8PM = new Date(today);
today8PM.setHours(20, 0, 0, 0); // Set time to 8:00 PM
const today10PM = new Date(today);
today10PM.setHours(22, 0, 0, 0);

// Dummy data for timeslots
const timeslots = [
    {
        start: today8PM,
        end: today10PM,
        title: 'Interview with John Doe',
        hrId: new mongoose.Types.ObjectId(), // Replace with actual HR ID or keep as dummy
    },
    {
        start: new Date('2023-10-25T11:00:00'),
        end: new Date('2023-10-25T12:00:00'),
        title: 'Interview with Jane Smith',
        hrId: new mongoose.Types.ObjectId(), // Replace with actual HR ID or keep as dummy
    },
    {
        start: new Date('2023-10-26T14:00:00'),
        end: new Date('2023-10-26T15:00:00'),
        title: 'Interview with Alice Johnson',
        hrId: new mongoose.Types.ObjectId(), // Replace with actual HR ID or keep as dummy
    },
    {
        start: new Date('2023-10-27T10:00:00'),
        end: new Date('2023-10-27T11:00:00'),
        title: 'Interview with Bob Brown',
        hrId: new mongoose.Types.ObjectId(), // Replace with actual HR ID or keep as dummy
    },
];

// Insert dummy data into the database
const seedDatabase = async () => {
    try {
        await connectDB()
        await interviewModel.deleteMany({}); // Clear existing data
        await interviewModel.insertMany(timeslots); // Insert new data
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
};

seedDatabase();