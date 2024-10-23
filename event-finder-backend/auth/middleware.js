import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {
   const token = req.cookies.token;

   if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
   }

   try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(decodedToken.id);

      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      req.user = user;

      next();
   } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
   }
};
export default authenticate;
