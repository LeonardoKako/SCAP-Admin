import { appError } from "../errors/appError";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import userService from "../modules/user/userService.js";

export const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        throw new appError("Não autorizado", "UNAUTHORIZED", 401);
    }

    // É usado o padrão do Bearer token
    // Bearer token sempre retorna: "Bearer + token"
    // Função split separa a palavra bearer do token em um array quando tem um espaço em branco
    // Bearer fica na posição 0 e o token na 1
    // Pega a posição 1 para ter o token
    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.JWT_PASSWORD);

        const user = await userService.getById(id);

        const { password: _, ...loggedUser } = user;

        req.user = loggedUser;

        // está tudo certo, pode executar próxima função
        next();
    } catch(error) {
        if(error.code === "USER_NOT_FOUND") {
            return next(new appError("Não autorizado", "UNAUTHORIZED", 401));
        }
        return next(error);
    }   
}