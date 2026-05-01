import { Router } from 'express';
import { create, getById, listAll } from './sectorController.js';

const router = Router();

/**
 * @openapi
 * /setores:
 *   get:
 *     summary: Lista todos os setores
 *     tags: [Sector]
 *     responses:
 *       200:
 *         description: Uma lista de setores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sector'
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/setores", listAll);
/**
 * @openapi
 * /setores/{id}:
 *   get:
 *     summary: Busca setor por id
 *     tags: [Sector]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID único do setor
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Retorna dados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sector'
 *       400:
 *         description: ID não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Setor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/setores/:id", getById);

router.post("/criar/setor", create);

export default router;

