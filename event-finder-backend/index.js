require("dotenv").config(); 
const express = require("express");
const app = express();
app.listen(3000, () => console.log("Server is running"));
console.log(process.env.MONGODB_URL);

const mongoose = require("mongoose");

mongoose.connect(
    process.env.MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);