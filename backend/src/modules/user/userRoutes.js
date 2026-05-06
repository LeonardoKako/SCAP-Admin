import { Router } from 'express';
import { create, getById, listAll, update } from "./userController.js";

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
router.get("/usuarios", listAll);
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
router.get("/usuarios/:id", getById);
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
router.post("/criar/usuario", create);

router.put("/atualizar/usuario/:id", update);

export default router;
