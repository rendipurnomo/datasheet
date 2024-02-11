import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { connectToGoogleSheet } from './config/database.js';
import userRoute from './routes/dataRoute.js';

dotenv.config();

const app = express();

app.use(cors(
  {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToGoogleSheet();
app.use(userRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});