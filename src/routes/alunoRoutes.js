import { Router } from "express";
const router = Router();

import loginRequired from '../middlewares/loginRequired.js'

import AlunoController from "../controllers/AlunoController.js";

router.get('/:id', loginRequired, AlunoController.show);
router.get('/', loginRequired, AlunoController.index);
router.post('/', loginRequired, AlunoController.store);
router.put('/:id', loginRequired, AlunoController.update);
router.delete('/:id', loginRequired, AlunoController.delete);

export default router;