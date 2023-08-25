import express from "express";
const router = express.Router();

import { recomputeController } from "../../controllers/gps/recompute.js";

router.post("/", recomputeController);

export default router;
