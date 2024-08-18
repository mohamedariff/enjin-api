import express from "express";

import { pmController } from "../../../controllers/gps/g7/pm.js";
import { tripController } from "../../../controllers/gps/g7/trip.js";
import { latestController } from "../../../controllers/gps/g7/latest.js";

const router = express.Router();

router.get("/pm", pmController);
router.post("/trip", tripController);
router.post("/latest", latestController);

export default router;
