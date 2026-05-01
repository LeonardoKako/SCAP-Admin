import { appError } from "../../errors/appError.js";
import sectorService from "./sectorService.js";

export async function listAll(req, res) {   
    try{
        const sectors = await sectorService.listAll();
        return res.status(200).json(sectors);
    }
    catch(error){
        return res.status(500).json({
            message: "Erro no servidor"
        });
    }  
}

export async function getById(req, res, next) {
    try {
        const sectorId = Number(req.params.id);
    
        if(isNaN(sectorId)){
            throw new appError("Esse ID não é válido.", "INVALID_ID", 400);
        }

        const sector = await sectorService.getById(sectorId);

        return res.status(200).json({
            success: true,
            data: sector
        });  
    } catch (error) {
        return next(error);
    }  
}

export async function create(req, res, next) {
    try {
        const { name } = req.body;
        const sector = await sectorService.create(name);
        
        const message = `Setor ${name} foi criado com sucesso!`;

        return res.status(201).json({
            success: true,
            message: message,
            data: sector
        });
    } catch (error) {
        return next(error);
    }
}


export default {
    listAll,
    getById,
    create
};