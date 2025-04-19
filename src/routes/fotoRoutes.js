import { Router } from "express";
const router = Router();
import loginRequired from '../middlewares/loginRequired.js'

import FotoController from "../controllers/FotoController.js";

router.post('/', loginRequired, FotoController.store);

export default router;