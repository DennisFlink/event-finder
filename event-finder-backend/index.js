import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './routes/routes.js';
const app = express();

app.use(express.json());
app.listen(3000, () => console.log('Server is running'));
app.use('/api', apiRouter);

dotenv.config();
const connectionString = process.env.MONGODB_URL;

mongoose
	.connect(connectionString)
	.then(() => {
		console.log('Connected to MongoDB');
		// createEvents();
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});
mongoose.connection.on('connected', () => {
	console.log('Mongoose connected to db');
});
