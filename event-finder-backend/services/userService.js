import User from '../models/userSchema.js';
const createUser = async (user) => {
   const newUser = new User(user);
   return await newUser.save();
};

export { createUser };
