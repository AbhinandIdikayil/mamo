"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inteviewModel_1 = require("../model/inteviewModel");
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("../config/db");
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
        hrId: new mongoose_1.default.Types.ObjectId(), // Replace with actual HR ID or keep as dummy
    },
    {
        start: new Date('2023-10-25T11:00:00'),
        end: new Date('2023-10-25T12:00:00'),
        title: 'Interview with Jane Smith',
        hrId: new mongoose_1.default.Types.ObjectId(), // Replace with actual HR ID or keep as dummy
    },
    {
        start: new Date('2023-10-26T14:00:00'),
        end: new Date('2023-10-26T15:00:00'),
        title: 'Interview with Alice Johnson',
        hrId: new mongoose_1.default.Types.ObjectId(), // Replace with actual HR ID or keep as dummy
    },
    {
        start: new Date('2023-10-27T10:00:00'),
        end: new Date('2023-10-27T11:00:00'),
        title: 'Interview with Bob Brown',
        hrId: new mongoose_1.default.Types.ObjectId(), // Replace with actual HR ID or keep as dummy
    },
];
// Insert dummy data into the database
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        yield inteviewModel_1.interviewModel.deleteMany({}); // Clear existing data
        yield inteviewModel_1.interviewModel.insertMany(timeslots); // Insert new data
        console.log('Database seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
    finally {
        mongoose_1.default.connection.close(); // Close the connection
    }
});
seedDatabase();
