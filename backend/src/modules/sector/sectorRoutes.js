import { Router } from 'express';
import { getById, listAll } from './sectorController.js';

const router = Router();

router.get("/setores", listAll);
router.get("/setores/:id", getById);

export default router;

