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
            throw new appError("Esse ID deve ser um número é válido.", "INVALID_ID", 400);
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

        if(typeof name !== 'string'){
            throw new appError("O nome do setor deve ser uma string", "INVALID_TYPE", 400);
        }

        const verifySectorName = await sectorService.getByName(name);

        if(name === null || name.trim().length === 0) {
            throw new appError("Nome está vazio ou contém apenas espaço", "INVALID_NAME", 400);
        }

        if(verifySectorName) {
            throw new appError(`O setor ${name} já está cadastrado!`, "SECTOR_ALREADY_EXISTS", 409);
        }

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

export async function update(req, res, next) {
    try {
        const sectorId = Number(req.params.id);

        if(isNaN(sectorId)){
            throw new appError("Esse ID deve ser um número é válido", "INVALID_ID", 400);
        }

        const { name } = req.body;

        const sectorBody = {
            name: name
        }

        if (typeof name !== 'string') {
            throw new appError("O nome do setor deve ser uma string", "INVALID_TYPE", 400);
        }

        if(!name || name.trim().length === 0) {
            throw new appError("Nome está vazio ou contém apenas espaço", "INVALID_NAME", 400);
        }

        // método .getById() já trata erro 404
        const verifySectorId = await sectorService.getById(sectorId);

        const verifySectorName = await sectorService.getByName(name);

        if(verifySectorName && verifySectorName.id !== sectorId) {
            throw new appError(`O setor ${name} já está cadastrado!`, "SECTOR_ALREADY_EXISTS", 409);
        }

        const updatedSector = await sectorService.update(sectorBody, sectorId);

        const message = `Setor ${name} atualizado com sucesso`;

        return res.status(200).json({
            success: true,
            message: message,
            data: updatedSector
        });

    } catch(error) {
        return next(error);
    }
}

export async function deleteSector(req, res, next) {
    try {
        const sectorId = Number(req.params.id);
        await sectorService.deleteSector(sectorId);
        return res.status(204).end();
    } catch (error) {
        return next(error);
    }
}


export default {
    listAll,
    getById,
    create,
    update
};