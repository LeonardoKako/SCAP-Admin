import userService from "./userService.js";

export async function listAll(req, res, next) {
       try {
        const users = await userService.listAll();
        res.status(200).json(users);
    }
    catch (error) {
        return next(error);
    }    
}

export async function getById(req, res, next) {
    try {         
        const userId = Number(req.params.id);  
        const user = await userService.getById(userId);

        return res.status(200).json({
            success: true,
            data: user
        });     
    } catch (error) {
        return next(error);
    }
}

export async function create(req, res, next) {
    try {
        const { name, email, password, profileId, sectorId } = req.body;

        const userBody = { 
            name, 
            email,
            password,
            profileId, 
            sectorId 
        };

        const user = await userService.create(userBody);

        const message = `Usuário ${name} cadastrado com sucesso!`;

        return res.status(201).json({
            success: true,
            message: message,
            data: user
        });
    } catch(error){
        return next(error);
    }
}

export async function update(req, res, next) {
    try {
        const userId = Number(req.params.id);

        const { name, email, password, profileId, sectorId } = req.body;

        const userBody = {
            name,
            email,
            password,
            profileId,
            sectorId
        };

        const updatedUser = await userService.update(userBody, userId);

        return res.status(200).json({
            success: true,
            message: "Usuário atualizado com sucesso!",
            data: updatedUser
        });
    } catch (error) {
        return next(error);
    }
}

export async function deleteUser(req, res, next) {
    try {
        const userId = Number(req.params.id);
        await userService.deleteUser(userId);
        return res.status(204).end();
    } catch(error) {
        return next(error);
    }
}

export default {
    listAll,
    getById,
    create,
    deleteUser,
    update
};