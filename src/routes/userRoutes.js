import { Router } from "express";
const router = Router();

import loginRequired from "../middlewares/loginRequired.js";
import UserController from "../controllers/UserController.js";

// Essas rotas não existiriam por questão de segurança.
router.get('/', loginRequired, UserController.index); // Lista usuarios
// router.get('/:id', loginRequired, UserController.show); // Lista usuario por ID

router.post('/', UserController.store);
router.patch('/',loginRequired, UserController.update);
router.delete('/',loginRequired, UserController.delete); 

export default router;