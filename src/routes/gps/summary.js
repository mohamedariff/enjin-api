import cache from '../../middleware/cache.js'

import express from "express";
const router = express.Router();

import { summaryController } from "../../controllers/gps/summary.js";

router.post("/", cache, summaryController);

export default router;
