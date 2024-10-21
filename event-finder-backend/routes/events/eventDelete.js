import { Router } from "express";
import Events from "../../models/eventSchema.js";
const router = Router();

router.delete("/", async (req, res) => {
  res.status(200);
});

export const eventDeleteRouter = router;
