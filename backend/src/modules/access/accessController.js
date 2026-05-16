import accessService from "./accessService.js";

export async function listAll(req, res, next) {  
    try {
        const access = await accessService.listAll();
        res.status(200).json(access);
    }
    catch(error) {
        return next(error);
    }

}

export async function getById(req, res, next) {
     try {
        const accessId = Number(req.params.id);

        const access = await accessService.getById(accessId);

        return res.status(200).json({
            success: true,
            data: access
        });
    } catch(error) {
        return next(error);
    }
}

export async function create(req, res, next) {
    try {
        const { userId } = req.body;

        const accessBody = { userId };

        const access = await accessService.create(accessBody);

        return res.status(201).json({
            success: true,
            message: "O acesso foi registrado com sucesso",
            data: access
        });
    } catch(error){
        return next(error);
    }
}

export async function update(req, res, next) {
    try {
        const accessId = Number(req.params.id);

        const { dateTime } = req.body;     

        const accessBody = {
            dateTime: dateTime
        };

        const updatedAccess = await accessService.update(accessBody, accessId);

        return res.status(200).json({
            success: true,
            message: "O acesso foi atualizado com sucesso!",
            data: updatedAccess
        });
    } catch(error) {
        return next(error);
    }
}

export default {
    listAll,
    getById,
    create
};