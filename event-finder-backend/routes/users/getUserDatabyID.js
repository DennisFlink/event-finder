import { Router } from 'express';
import User from '../../models/userSchema';

const router = Router();

router.get('/user/:userid', async (req, res) => {
	const authorId = req.params.authorId;
	const userData = await User.find({ _id: authorId });
	res.status(200).json(userData);
});

export const eventByAuthorRouter = router;
