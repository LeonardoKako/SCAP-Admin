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

export async function getById(req, res) {
    
    const userId = Number(req.params.id);

    if(isNaN(userId)) {
        return res.status(400).json({
            success: false,
            error: {
                code: "INVALID_ID",
                message: "ID inválido"
            }
        });
    }

    try {
        
        const user = await userService.getById(userId);

        if(user === null){
            return res.status(404).json({
                success: false,
                error: {
                    code: "USER_NOT_FOUND",
                    message: "Usuário não encontrado"
                }
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Erro interno no servidor"
            }
        });
    }
}

export default {
    listAll,
    getById
};