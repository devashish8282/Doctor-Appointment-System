const mongoose = require('mongoose');
const colors = require('colors');
const { config } = require('dotenv');

config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Mongodb connected: ${conn.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`Mongodb Server Issue: ${error.message}`.bgRed.white);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
