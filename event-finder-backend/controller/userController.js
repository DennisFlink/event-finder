import User from '../models/userSchema.js';
import { createUser, authenticateUser } from '../services/userService.js';

const createUserController = async (req, res) => {
	try {
		const newUser = req.body;
		const newUserData = await createUser(newUser);
		res.status(201).json(newUserData);
	} catch (error) {
		if (error.message === 'User already exists') {
			return res.status(400).json([{ message: 'User already exists', error }]);
		}

		return res.status(500).json([{ message: 'ERROR', error }]);
	}
};

const loginController = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await authenticateUser(email, password);
		res.status(200).json({ message: 'Login successful', user });
	} catch (error) {
		if (
			error.message === 'User not found' ||
			error.message === 'Invalid password'
		) {
			return res.status(400).json({ message: error.message });
		}
		res.status(500).json({ message: 'ERROR', error });
	}
};

const getAllUsersController = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({ message: 'success', users });
	} catch (error) {
		res.status(500).json({ message: 'error: ', error });
	}
};

const getUserByIdController = async (req, res) => {
	const userId = req.params.id;
	try {
		const user = await User.findById(userId);
		res.status(200).json({ message: 'success', user });
	} catch (error) {
		res.status(500).json({ message: 'error', error });
	}
};

export {
	createUserController,
	loginController,
	getAllUsersController,
	getUserByIdController,
};
