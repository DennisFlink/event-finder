import dotenv from "dotenv";
dotenv.config();

import  {createUsers}  from "./seed/createUser.js";
import express from "express";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
const app = express();
const connectionString = process.env.MONGODB_URL;
console.log(connectionString);
app.listen(3000, () => console.log("Server is running"));



mongoose.connect(connectionString)
.then(() => {
    console.log('Connected to MongoDB');
    createUsers();
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db');
});



