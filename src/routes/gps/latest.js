import express from "express";
const router = express.Router();

import { latestController } from "../../controllers/gps/latest.js";

router.post("/", latestController);

export default router;
