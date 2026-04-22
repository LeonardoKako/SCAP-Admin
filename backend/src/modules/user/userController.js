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

export default {
    listAll
};