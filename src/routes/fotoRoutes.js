import { Router } from "express";
const router = Router();
import multer from 'multer';

import multerConfig from '../config/multer.js'
const upload = multer(multerConfig);

import FotoController from "../controllers/FotoController.js";

router.post('/', upload.single('photo'), FotoController.store);

export default router;