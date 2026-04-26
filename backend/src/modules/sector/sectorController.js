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

export async function getById(req, res) {

    const sectorId = Number(req.params.id);
    
    if(isNaN(sectorId)){
            return res.status(400).json({
                success: false,
                error: {
                    code: "INVALID_ID",
                    message: "ID inválido"
                }

            })
        }

    try {
        const sector = await sectorService.getById(sectorId);

        if(sector === null) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "SECTOR_NOT_FOUND",
                    message: "Setor não encontrado"
                }
                
            })
        }

        return res.status(200).json({
            success: true,
            data: sector
        });   
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Erro interno no servidor"
            }
            
        })
    }
    
}


export default {
    listAll,
    getById
};