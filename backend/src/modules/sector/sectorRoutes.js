import { Router } from 'express';
import { create, deleteSector, getById, listAll, update } from './sectorController.js';

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
/**
  * @openapi
  * /criar/setor:
  *   post:
  *     summary: Cria um novo setor
  *     tags: [Sector]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               - name
  *             properties:
  *               name:
  *                 type: string
  *                 example: "Financeiro"
  *     responses:
  *       201:
  *         description: Setor criado com sucesso
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 success:
  *                   type: boolean
  *                 message:
  *                   type: string
  *                 data:
  *                   $ref: '#/components/schemas/Sector'
  *       400:
  *         description: Dados de entrada inválidos (campos vazios ou formatos incorretos)
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/ErrorResponse'
  *       409:
  *         description: Setor já está registrado
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
router.post("/criar/setor", create);

router.put("/atualizar/setor/:id", update);

router.delete("/deletar/setor/:id", deleteSector);
export default router;

