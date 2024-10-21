import User from '../models/userSchema.js';
const createUser = async (user) => {
   const { email } = user;
   const existingUser = await User.findOne({ email: email });

   if (existingUser) {
      throw new Error('User already exists');
   }
   const newUser = new User(user);
   return await newUser.save();
};

export { createUser };
