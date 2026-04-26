import { Router } from 'express';
import { getById, listAll } from './accessController.js';

const router = new Router();

router.get("/acessos", listAll);
router.get("/acessos/:id", getById);

export default router;