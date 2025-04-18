import { Router } from "express";
const router = Router();

import UserController from "../controllers/UserController.js";

router.post('/', UserController.store);
router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.patch('/:id', UserController.update)
router.delete('/:id', UserController.delete)

export default router;