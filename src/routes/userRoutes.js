import { Router } from "express";
const router = Router();

import loginRequired from "../middlewares/loginRequired.js";

import UserController from "../controllers/UserController.js";

router.post('/', loginRequired, UserController.store);
router.get('/', loginRequired, UserController.index);
router.get('/:id', UserController.show);
router.patch('/:id', UserController.update)
router.delete('/:id', UserController.delete)

export default router;