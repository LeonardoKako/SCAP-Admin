import { Router } from 'express';
import { listAll } from "./userController.js";

const router = new Router();

router.get("/usuarios", listAll);

export default router;
