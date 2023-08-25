import express from "express";
const router = express.Router();

import {
  esolat_daily,
  esolat_monthly,
  esolat_weekly,
  esolat_yearly,
} from "../controllers/solat.js";

router.get("/daily", esolat_daily);
router.get("/weekly", esolat_weekly);
router.get("/monthly", esolat_monthly);
router.get("/yearly", esolat_yearly);

export default router;
