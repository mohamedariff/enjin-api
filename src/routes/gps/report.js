import cache from '../../middleware/cache.js'

import express from "express";
const router = express.Router();

import { fuelReportController, tripReportController } from "../../controllers/gps/report.js";

router.post("/fuel", /* cache, */ fuelReportController);
router.post("/trip", /* cache, */ tripReportController);

export default router;
