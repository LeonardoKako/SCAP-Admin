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


export default {
    listAll
};