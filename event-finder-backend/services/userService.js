import User from '../models/userSchema.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;

const hashPassword = async (password) => {
   const hashedPassword = await bcrypt.hash(password, saltRounds);
   return hashedPassword;
};
const createUser = async (user) => {
   const { email } = user;
   const existingUser = await User.findOne({ email: email });

   if (existingUser) {
      throw new Error('User already exists');
   }
   const hashedPassword = await hashPassword(user.password);
   user.password = hashedPassword;
   const newUser = new User(user);
   return await newUser.save();
};

const authenticateUser = async (email, password) => {
   const user = await User.findOne({ email: email });
   if (!user) {
      throw new Error('User not found');
   }
   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
      throw new Error('Invalid password');
   }
   const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour',
   });

   return { user, token };
};
export { createUser, authenticateUser };
