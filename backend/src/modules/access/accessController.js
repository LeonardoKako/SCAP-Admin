import { appError } from "../../errors/appError.js";
import accessService from "./accessService.js";

export async function listAll(req, res) {
    
    try {
        const access = await accessService.listAll();
        res.status(200).json(access);
    }
    catch(error) {
        res.status(500).json({
            message: "Erro no servidor"
        });
    }

}

export async function getById(req, res, next) {
     try {
        const accessId = Number(req.params.id);

        if(isNaN(accessId)) {
            throw new appError("O id deve ser um número válido", "INVALID_ID", 400);
        }

        const access = await accessService.getById(accessId);

        if(!access){
            throw new appError("ID não corresponde a nenhum acesso", "ACCESS_NOT_FOUND", 404);
        }

        return res.status(200).json({
            success: true,
            data: access
        });
    } catch(error) {
        return next(error);
    }
}

export async function create(req, res, next) {
    try {
        const { userId } = req.body;

        const accessBody = { userId };

        if(isNaN(userId)) {
            throw new appError("O id deve ser um número válido", "INVALID_ID", 400);
        }

        if(!userId) {
            throw new appError("O campo userId é obrigatório", "MISSING_FIELDS", 400);
        }

        const verifyUserId = await accessService.getById(userId);

        if(!verifyUserId) {
            throw new appError("Não é possível registrar o acesso, porque o userId não corresponde a nenhum usuário!",
                             "USER_NOT_FOUND", 404);
        }

        const access = await accessService.create(accessBody);

        return res.status(201).json({
            success: true,
            message: "O acesso foi registrado com sucesso",
            data: access
        });
    } catch(error){
        return next(error);
    }
}

export default {
    listAll,
    getById,
    create
};