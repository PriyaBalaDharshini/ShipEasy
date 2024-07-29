import express from "express";
import mongoose from "mongoose";
import cron from "node-cron"
import dotenv from "dotenv"
dotenv.config();

const app = express();
const PORT = process.env.PORT

// DB Connection
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
    .then(() => console.log("DataBase connection done"))
    .catch((error) => console.log(error));

//Task Scheduler
const run = () => {
    cron.schedule('5 * * * * *', () => {
        console.log('running a task every second');
    });
}
run()
//Server

app.listen(PORT, (req, res) => console.log(`App is listening to ${PORT}`))
