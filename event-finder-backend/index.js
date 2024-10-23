import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './routes/routes.js';
import cookieParser from 'cookie-parser';
import { createEvents } from './seed/createEvent.js';

import cors from 'cors';
const app = express();
app.use(cookieParser());
const corsOptions = {
	origin: 'http://localhost:5173', // Allow requests from your frontend origin
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

app.use(express.json());

app.listen(3000, () => console.log('Server is running'));
app.use('/api', apiRouter);

dotenv.config();
const connectionString = process.env.MONGODB_URL;

mongoose
	.connect(connectionString)
	.then(async () => {
		console.log('Connected to MongoDB');
		// createEvents();
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});
mongoose.connection.on('connected', () => {
	console.log('Mongoose connected to db');
});
