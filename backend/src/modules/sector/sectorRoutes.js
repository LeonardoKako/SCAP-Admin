import { Router } from 'express';
import { create, deleteSector, getById, listAll, update } from './sectorController.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

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
router.get("/setores", authMiddleware, listAll);
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
router.get("/setores/:id", authMiddleware, getById);
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
router.post("/criar/setor", authMiddleware, create);
/**
 * @openapi
 * /atualizar/setor/{id}:
 *   put:
 *     summary: Atualiza um setor existente
 *     tags: [Sector]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID único do setor
 *         schema:
 *           type: integer
 *           example: 1
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
 *                 example: "Recursos Humanos"
 *     responses:
 *       200:
 *         description: Setor atualizado com sucesso
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
 *         description: Dados de entrada inválidos (campos vazios ou ID inválido)
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
 *       409:
 *         description: Nome do setor já está registrado
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
router.put("/atualizar/setor/:id", authMiddleware, update);
/**
 * @openapi
 * /deletar/setor/{id}:
 *   delete:
 *     summary: Deleta um setor existente
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
 *       204:
 *         description: Setor deletado com sucesso (sem conteúdo)
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
router.delete("/deletar/setor/:id", authMiddleware, deleteSector);
export default router;

