import { Router } from 'express';
import Events from '../../models/eventSchema.js';

const router = Router();

router.get('/:authorId', async (req, res) => {
	const authorId = req.params.authorId;
	const authorEvents = await Events.find({ authorId: authorId });
	res.status(200).json(authorEvents);
});

export const eventByAuthorRouter = router;
