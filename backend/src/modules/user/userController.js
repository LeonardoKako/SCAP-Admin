import { appError } from "../../errors/appError.js";
import userService from "./userService.js";

export async function listAll(req, res) {
       try {
        const users = await userService.listAll();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({
            message: "Erro no servidor"
        });
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

export default {
    listAll,
    getById,
    create
};