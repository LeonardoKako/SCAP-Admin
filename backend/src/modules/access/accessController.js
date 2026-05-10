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

export async function update(req, res, next) {
    try {
        const accessId = Number(req.params.id);

        const { dateTime } = req.body;     
        
        // No patch confere se o campo está sendo enviado
        // Se sim, formata e trata erros
        if(!dateTime) {
            throw new appError("O campo de dateTime é obrigatório para atualização", "MISSING_FIELDS", 400);
        }

        if(typeof dateTime !== 'string') {
            throw new appError("O campo de dateTime deve ser um texto (string) no formato ISO",
                     "INVALID_TYPE", 400);
        }

        const formattedDateTime = new Date(dateTime);

        if(isNaN(formattedDateTime.getTime())) {
            throw new appError("O formato da data e hora não é válido", "INVALID_FORMAT", 400);
        }

        // confere se a data/horário é no futuro
        if(formattedDateTime > new Date()) {
            throw new appError("A data e hora não pode estar no futuro.", "FUTURE_DATE", 400);
        }

        if(isNaN(accessId)) {
            throw new appError("O id do acesso deve ser um número válido", "INVALID_ID", 400);
        }

        const accessBody = {
            dateTime: formattedDateTime
        };

        // Tratar se o horário atualizado está entre o horário do acesso anterior e do posterior. 
        // Não deve ser possível atualizar um acesso para antes do acesso anterior nem pra depois do posterior
        // Solução provável é buscar no banco o acesso anterior e posterior

        const updatedAccess = await accessService.update(accessBody, accessId);

        return res.status(200).json({
            success: true,
            message: "O acesso foi atualizado com sucesso!",
            data: updatedAccess
        });
    } catch(error) {
        return next(error);
    }
}

export default {
    listAll,
    getById,
    create
};