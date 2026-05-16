import sectorService from "./sectorService.js";

export async function listAll(req, res, next) {   
    try{
        const sectors = await sectorService.listAll();
        return res.status(200).json(sectors);
    }
    catch(error){
        return next(error);
    }  
}

export async function getById(req, res, next) {
    try {
        const sectorId = Number(req.params.id);

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

        const sectorBody = {
            name
        };

        const sector = await sectorService.create(sectorBody);
        
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

        const { name } = req.body;

        const sectorBody = {
            name: name
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