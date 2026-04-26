import { Router } from 'express';
import { getById, listAll } from "./userController.js";

const router = new Router();

router.get("/usuarios", listAll);
router.get("/usuarios/:id", getById);

export default router;
