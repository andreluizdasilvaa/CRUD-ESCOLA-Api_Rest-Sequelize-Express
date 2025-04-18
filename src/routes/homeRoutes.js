import { Router } from "express";
const router = Router();

import HomeController from "../controllers/HomeController.js";

router.get('/', HomeController);

export default router;