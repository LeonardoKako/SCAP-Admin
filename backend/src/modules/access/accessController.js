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

export async function getById(req, res) {

    const accessId = Number(req.params.id);

    if(isNaN(accessId)) {
        return res.status(400).json({
            success: false,
            error: {
                code: "INVALID_ID",
                message: "ID inválido"
            }
        });
    }
    
    try {

        const access = await accessService.getById(accessId);

        if(access === null) {
            return res.status(404).json({
                success: false,
                error: {
                    code: "ACCESS_NOT_FOUND",
                    message: "Acesso não encontrado"
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: access
        });

    } catch(error) {
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Erro interno do servidor"
            }
        });
    }
}

export default {
    listAll,
    getById
};