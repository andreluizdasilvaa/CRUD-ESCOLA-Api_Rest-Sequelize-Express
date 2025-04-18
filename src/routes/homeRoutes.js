import { Router } from "express";
const router = Router();

import HomeController from "../controllers/HomeController.js";

router.get('/', HomeController.index);

export default router;