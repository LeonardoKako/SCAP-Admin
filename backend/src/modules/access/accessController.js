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

export default {
    listAll
};