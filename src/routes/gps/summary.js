import express from "express";
const router = express.Router();

import { summaryController } from "../../controllers/gps/summary.js";

router.post("/", summaryController);

export default router;
