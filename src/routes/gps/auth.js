import express from "express";
const router = express.Router();

import { authController } from "../../controllers/gps/auth.js";

router.get("/", authController);

export default router;
