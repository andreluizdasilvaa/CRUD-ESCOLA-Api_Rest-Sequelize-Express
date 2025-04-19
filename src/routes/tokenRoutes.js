import { Router } from "express";
const router = Router();

import TokenController from "../controllers/TokenController.js";

router.get('/', TokenController.store);

export default router;