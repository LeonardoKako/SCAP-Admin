import { Router } from 'express';
import { create, deleteUser, getById, listAll, update } from "./userController.js";
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = new Router();

/**
 * @openapi
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Uma lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/usuarios", authMiddleware, listAll);
/**
 * @openapi
 * /usuarios/{id}:
 *   get:
 *     summary: Busca usuário por id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID único do usuário
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Retorna dados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: ID não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuário não encontrado
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
router.get("/usuarios/:id", authMiddleware, getById);
/**
  * @openapi
  * /criar/usuario:
  *   post:
  *     summary: Cria um novo usuário
  *     tags: [User]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               - name
  *               - email
  *               - profileId
  *               - sectorId
  *             properties:
  *               name:
  *                 type: string
  *                 example: "João Silva"
  *               email:
  *                 type: string
  *                 format: email
  *                 example: "joao@email.com"
  *               profileId:
  *                 type: integer
  *                 example: 1
  *               sectorId:
  *                 type: integer
  *                 example: 2
  *     responses:
  *       201:
  *         description: Usuário criado com sucesso
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
  *                   $ref: '#/components/schemas/User'
  *       400:
  *         description: Dados de entrada inválidos (campos vazios ou formatos incorretos)
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/ErrorResponse'
  *       409:
  *         description: Email já está registrado
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
router.post("/criar/usuario", authMiddleware, create);
/**
 * @openapi
 * /atualizar/usuario/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID único do usuário
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
 *               - email
 *               - profileId
 *               - sectorId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Maria Santos"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "maria@email.com"
 *               profileId:
 *                 type: integer
 *                 example: 2
 *               sectorId:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
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
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Dados de entrada inválidos (campos vazios ou ID inválido)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email já está registrado
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
router.put("/atualizar/usuario/:id", authMiddleware, update);
/**
 * @openapi
 * /deletar/usuario/{id}:
 *   delete:
 *     summary: Deleta um usuário existente
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID único do usuário
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso (sem conteúdo)
 *       400:
 *         description: ID não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuário não encontrado
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
router.delete("/deletar/usuario/:id", authMiddleware, deleteUser);

export default router;
