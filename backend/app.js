import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRoute from './routes/users.js';
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from './routes/rooms.js';
import authsRoute from './routes/auth.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const app = express();

mongoose
  .connect(process.env.CONNECTION_STRING, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("CONNECTED to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

//middlewares
app.use(cors());
app.options("*", cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("tiny"));
app.use(`${process.env.API}/auth`, authsRoute)
app.use(`${process.env.API}/users`, usersRoute)
app.use(`${process.env.API}/hotels`, hotelsRoute);
app.use(`${process.env.API}/rooms`, roomsRoute);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something Went Wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

