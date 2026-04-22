import { Router } from 'express';
import { listAll } from './accessController.js';

const router = new Router();

router.get("/acessos", listAll);

export default router;