import express from "express";
const router = express.Router();

import {
  getUserController,
  updateUserController,
} from "../../controllers/gps/user.js";

router.post("/", getUserController);
router.post("/update", updateUserController);

export default router;
