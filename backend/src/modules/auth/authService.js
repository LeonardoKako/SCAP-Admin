import { appError } from "../../errors/appError.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userService from "../user/userService.js";
import 'dotenv/config';

async function login(loginBody) {
    const { email, password } = loginBody;

    if(typeof email !== 'string' || typeof password !== 'string') {
        throw new appError("Email e senha devem ser strings", "INVALID_FORMAT",400);
    }

    const cleanEmail = email.trim().toLowerCase();

    if(!cleanEmail || !password) {
        throw new appError("Email e senha são obrigatórios", "MISSING_FIELDS", 400);
    }

    const user = await userService.getByEmail(cleanEmail);

    if(!user) {
        throw new appError("Email ou senha inválidos. Tente novamente.", "INVALID_CREDENTIALS", 401);
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if(!verifyPassword) {
        throw new appError("Email ou senha inválidos. Tente novamente.", "INVALID_CREDENTIALS", 401);
    }

    // a "assinatura" do jwt pede um payload (no caso foi passado o id do usuário para identificá-lo)
    // Pede uma senha para o jwt
    // E pode ter opcionais como o tempo de expiração do token
    const token = jwt.sign(
        { id: user.id }, 
        process.env.JWT_PASSWORD, 
        { expiresIn: '1d'}
    );

    const { password: _, ...userLogin } = user;

    return {
        user: userLogin,
        token: token
    }
;
}

export default {
    login
}