import express from "express";
const router = express.Router();

import { resetController } from "../../controllers/gps/reset.js";

router.get("/", resetController);

export default router;
