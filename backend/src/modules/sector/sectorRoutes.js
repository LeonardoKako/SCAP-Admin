import { Router } from 'express';
import { listAll } from './sectorController.js';

const router = Router();

router.get("/setores", listAll);

export default router;

