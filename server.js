import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { connectToGoogleSheet } from './config/database.js';
import userRoute from './routes/dataRoute.js';

dotenv.config();

const app = express();

app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
  }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToGoogleSheet();
app.use(userRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});