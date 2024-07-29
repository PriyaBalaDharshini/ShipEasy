import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js"
import parcelRoutes from "./routes/parcelRoutes.js"


dotenv.config()

const app = express();
const PORT = process.env.PORT


//Middleware
app.use(cors())
app.use(express.json())
app.use("/api/user", userRoutes);
app.use("/api/parcel", parcelRoutes);


//DB Connection
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
    .then(() => console.log("DataBase connection done"))
    .catch((error) => console.log(error));

//Server

app.listen(PORT, (req, res) => console.log(`App is listening to ${PORT}`))