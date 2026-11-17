import { appError } from "../errors/appError.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import userService from "../modules/user/userService.js";

export const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        throw new appError("Não autorizado", "UNAUTHORIZED", 401);
    }

    let token = authorization.trim();
    while (token.toLowerCase().startsWith('bearer ')) {
        token = token.slice(7).trim();
    }

    if (!token) {
        throw new appError("Não autorizado", "UNAUTHORIZED", 401);
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_PASSWORD);

        const user = await userService.getById(id);

        const { password: _, ...loggedUser } = user;

        req.user = loggedUser;

        next();
    } catch (error) {
        if (
            error.code === "USER_NOT_FOUND" ||
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            return next(new appError("Não autorizado", "UNAUTHORIZED", 401));
        }
        return next(error);
    }   
};
