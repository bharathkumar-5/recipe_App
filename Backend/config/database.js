const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URL;
        if (!mongoURI) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }

        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
