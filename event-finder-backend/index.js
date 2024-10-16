import dotenv from 'dotenv';
import { createUsers } from './seed/createUser.js';
import express from 'express';
import mongoose from 'mongoose';
import User from './models/userSchema.js';

const app = express();
app.use(express.json());
dotenv.config();
const connectionString = process.env.MONGODB_URL;
app.listen(3000, () => console.log('Server is running'));

mongoose
	.connect(connectionString)
	.then(() => {
		console.log('Connected to MongoDB');
		// createUsers();
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});
mongoose.connection.on('connected', () => {
	console.log('Mongoose connected to db');
});

app.post('/users', async (req, res) => {
	const { email, password, username, age } = req.body;
	const newUser = new User({
		email,
		password,
		username,
		age,
	});

	await newUser.save();
	res.status(200).json([{ MESSAGE: 'CREATED NEW USER', newUser }]);
});
