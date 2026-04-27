import { appError } from "../../errors/appError.js";
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

export async function getById(req, res, next) {
     try {
        const accessId = Number(req.params.id);

        if(isNaN(accessId)) {
            throw new appError("Esse id não é válido", "INVALID_ID", 400);
        }

        const access = await accessService.getById(accessId);

        return res.status(200).json({
            success: true,
            data: access
        });
    } catch(error) {
        return next(error);
    }
}

export default {
    listAll,
    getById
};