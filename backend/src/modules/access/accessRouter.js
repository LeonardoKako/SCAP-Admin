import { Router } from 'express';
import { create, getById, listAll, update } from './accessController.js';

const router = new Router();

/**
 * @openapi
 * /acessos:
 *   get:
 *     summary: Lista todos os acessos
 *     tags: [Access]
 *     responses:
 *       200:
 *         description: Uma lista de acessos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Access'
 *       500:
 *         description: Erro no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/acessos", listAll);
/**
 * @openapi
 * /acessos/{id}:
 *   get:
 *     summary: Busca acesso por id
 *     tags: [Access]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID único do acesso
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Retorna dados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Access'
 *       400:
 *         description: ID não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Acesso não encontrado
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
router.get("/acessos/:id", getById);
/**
  * @openapi
  * /registrar/acesso:
  *   post:
  *     summary: Registra um acesso novo
  *     tags: [Access]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               - userId
  *             properties:
  *               userId:
  *                 type: integer
  *                 example: 1
  *     responses:
  *       201:
  *         description: Acesso registrado com sucesso
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
  *                   $ref: '#/components/schemas/Access'
  *       400:
  *         description: Dados de entrada inválidos (campos vazios ou formatos incorretos)
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/ErrorResponse'
  *       404:
  *         description: userId não corresponde a nenhum usuário
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
router.post("/registrar/acesso", create);

router.patch("/atualizar/acesso/:id", update);
export default router;