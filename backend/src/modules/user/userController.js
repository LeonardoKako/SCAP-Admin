import { appError } from "../../errors/appError.js";
import userService from "./userService.js";

export async function listAll(req, res, next) {
       try {
        const users = await userService.listAll();
        res.status(200).json(users);
    }
    catch (error) {
        return next(error);
    }    
}

export async function getById(req, res, next) {
    try {         
        const userId = Number(req.params.id);

        if(isNaN(userId)) {
            throw new appError("ID inválido", "INVALID_ID", 400);
        }
        
        const user = await userService.getById(userId);

        return res.status(200).json({
            success: true,
            data: user
        });
        
    } catch (error) {
        return next(error);
    }
}

export async function create(req, res, next) {
    try {
        const { name, email, profileId, sectorId } = req.body;

        const userBody = { 
            name, 
            email, 
            profileId, 
            sectorId 
        };

        if(typeof name !== 'string' || typeof email !== 'string') {
            throw new appError("O nome e o email devem ser uma string", "INVALID_FORMAT", 400);
        }

        const cleanName = name?.trim();
        const cleanEmail = email?.trim().toLowerCase();

        if(!profileId || !sectorId) {
            throw new appError("Perfil ou setor não foi preenchido para esse usuário!",
                                "MISSING_FIELDS", 400);
        }

        if(typeof profileId !== 'number' || typeof sectorId !== 'number') {
            throw new appError("Os IDs de perfil e setor devem ser números válidos",
                            "INVALID_FORMAT", 400);
        }

        if(!cleanName || cleanName.length === 0) {
            throw new appError("O nome não pode estar vazio ou ter apenas espaços.",
                            "INVALID_NAME", 400);
        }

        if(!cleanEmail || cleanEmail.length === 0) {
            throw new appError("O email não pode estar vazio ou ter apenas espaços.",
                             "INVALID_EMAIL", 400);
        }

        if(!cleanEmail.includes("@")) {
            throw new appError("O formato do email não é válido", "INVALID_EMAIL_FORMAT", 400);
        }

        const verifyExistingEmail = await userService.getByEmail(cleanEmail);

        if(verifyExistingEmail) {
            throw new appError("Esse email já está cadastrado!", "EMAIL_ALREADY_EXISTS", 409);
        }

        const user = await userService.create(userBody);

        const message = `Usuário ${name} cadastrado com sucesso!`;

        return res.status(201).json({
            success: true,
            message: message,
            data: user
        });
    } catch(error){
        return next(error);
    }
}

export async function update(req, res, next) {
    try {
        const userId = Number(req.params.id);

        if(isNaN(userId)) {
            throw new appError("ID inválido", "INVALID_ID", 400);
        }

        const { name, email, profileId, sectorId } = req.body;

        const userBody = {
            name,
            email,
            profileId,
            sectorId
        };

        // .getById() já trata erro 404
        await userService.getById(userId);

        if(typeof name !== 'string' || typeof email !== 'string') {
            throw new appError("O nome e o email devem ser uma string", "INVALID_FORMAT", 400);
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        if(!profileId || !sectorId) {
            throw new appError("Perfil ou setor não foi preenchido para esse usuário!",
                                "MISSING_FIELDS", 400);
        }

        if(typeof profileId !== 'number' || typeof sectorId !== 'number') {
            throw new appError("Os IDs de perfil e setor devem ser números válidos",
                            "INVALID_FORMAT", 400);
        }

        if(!cleanName || cleanName.length === 0) {
            throw new appError("O nome não pode estar vazio ou ter apenas espaços.",
                            "INVALID_NAME", 400);
        }

        if(!cleanEmail || cleanEmail.length === 0) {
            throw new appError("O email não pode estar vazio ou ter apenas espaços.",
                             "INVALID_EMAIL", 400);
        }

        if(!cleanEmail.includes("@")) {
            throw new appError("O formato do email não é válido", "INVALID_EMAIL_FORMAT", 400);
        }

        const verifyExistingEmail = await userService.getByEmail(cleanEmail);

        if(verifyExistingEmail && verifyExistingEmail.id !== userId) {
            throw new appError("Esse email já está cadastrado!", "EMAIL_ALREADY_EXISTS", 409);
        }

        const updatedUser = await userService.update(userBody, userId);

        return res.status(200).json({
            success: true,
            message: "Usuário atualizado com sucesso!",
            data: updatedUser
        });
    } catch (error) {
        return next(error);
    }
}

export async function deleteUser(req, res, next) {
    try {
        const userId = Number(req.params.id);
        await userService.deleteUser(userId);
        return res.status(204).end();
    } catch(error) {
        return next(error);
    }
}

export default {
    listAll,
    getById,
    create,
    deleteUser,
    update
};