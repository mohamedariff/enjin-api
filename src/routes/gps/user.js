import express from "express";
const router = express.Router();

import {
  insertUserController,
  getUserController,
} from "../../controllers/gps/user.js";

router.post("/get", getUserController);
router.post("/insert", insertUserController);

export default router;
