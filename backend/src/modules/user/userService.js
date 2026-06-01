import prisma from '../../database/prisma.js';
import { appError } from "../../errors/appError.js";
import bcrypt from 'bcrypt';

async function listAll() {
        const users = await prisma.user.findMany();
        return users; 
}

async function getById(userId) {
    const id = Number(userId);

    if(isNaN(id)) {
            throw new appError("ID inválido", "INVALID_ID", 400);
    }

     const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if(!user){
        throw new appError("ID não corresponde a nenhum usuário", "USER_NOT_FOUND", 404);
    }
        
    return user; 
}

async function create(userBody) {
    const { name, email, password, profileId, sectorId } = userBody;

    if(typeof name !== 'string' || typeof email !== 'string') {
        throw new appError("O nome e o email devem ser uma string", "INVALID_FORMAT", 400);
    }

    if(typeof password !== 'string') {
        throw new appError("A senha deve ser uma string", "INVALID_FORMAT", 400);
    }

    const cleanName = name.trim();
    const cleanPassword = password.trim();
    const cleanEmail = email.trim().toLowerCase();

    if(!profileId || !sectorId) {
            throw new appError("Perfil ou setor não foi preenchido para esse usuário!",
                                "MISSING_FIELDS", 400);
    }

    if(typeof profileId !== 'number' || typeof sectorId !== 'number') {
        throw new appError("Os IDs de perfil e setor devem ser números válidos",
                        "INVALID_FORMAT", 400);
    }

    if(!cleanName || cleanName.length === 0) {
        throw new appError("O nome não pode estar vazio ou ter apenas espaços.",
                        "INVALID_NAME", 400);
    }

    if(!cleanEmail || cleanEmail.length === 0) {
        throw new appError("O email não pode estar vazio ou ter apenas espaços.",
                            "INVALID_EMAIL", 400);
    }

    if(!cleanEmail.includes("@")) {
        throw new appError("O formato do email não é válido", "INVALID_EMAIL_FORMAT", 400);
    }

    if(!cleanPassword || cleanPassword.length === 0) {
        throw new appError("O senha não pode estar vazia ou ter apenas espaços.",
                            "INVALID_PASSWORD", 400);
    }

    // Verifica se email já existe
    const verifyExistingEmail = await getByEmail(cleanEmail);

    if(verifyExistingEmail) {
        throw new appError("Esse email já está cadastrado!", "EMAIL_ALREADY_EXISTS", 409);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name: cleanName,
            email: cleanEmail,
            password: hashPassword,
            profileId: profileId,
            sectorId: sectorId
        }
    });

    // retira o hash da senha do retorno
    // Tira a senha do variável user e cria uma nova variável newUser sem a senha para retorno
    const { password: _, ...newUser } = user;

    return newUser;
}

async function update(userBody, userId) {
    const { name, email, profileId, sectorId } = userBody;
    const id = Number(userId);

    if(isNaN(id)) {
            throw new appError("ID inválido", "INVALID_ID", 400);
    }

    // Verifica se o usuário existe
    await getById(id);

    if(typeof name !== 'string' || typeof email !== 'string') {
            throw new appError("O nome e o email devem ser uma string", "INVALID_FORMAT", 400);
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if(!profileId || !sectorId) {
        throw new appError("Perfil ou setor não foi preenchido para esse usuário!",
                            "MISSING_FIELDS", 400);
    }

    if(typeof profileId !== 'number' || typeof sectorId !== 'number') {
        throw new appError("Os IDs de perfil e setor devem ser números válidos",
                        "INVALID_FORMAT", 400);
    }

    if(!cleanName || cleanName.length === 0) {
        throw new appError("O nome não pode estar vazio ou ter apenas espaços.",
                        "INVALID_NAME", 400);
    }

    if(!cleanEmail || cleanEmail.length === 0) {
        throw new appError("O email não pode estar vazio ou ter apenas espaços.",
                            "INVALID_EMAIL", 400);
    }

    if(!cleanEmail.includes("@")) {
        throw new appError("O formato do email não é válido", "INVALID_EMAIL_FORMAT", 400);
    }

    const verifyExistingEmail = await getByEmail(cleanEmail);

    if(verifyExistingEmail && verifyExistingEmail.id !== id) {
        throw new appError("Esse email já está cadastrado!", "EMAIL_ALREADY_EXISTS", 409);
    }


    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            name: name,
            email: email,
            profileId: profileId,
            sectorId: sectorId
        }
    });

    return updatedUser;
}

async function deleteUser(userId) {
    const id = Number(userId);
    if(isNaN(id)) {
        throw new appError("Esse ID deve ser um número é válido", "INVALID_ID", 400);
    }

    // Já trata erro
    await getById(userId);

    // Faz uma transaction (As duas operações sempre acontecem juntas. Se uma falhar, a outra dá ROLLBACK)
    // Deleta todos os acessos vinculados a um usuário que será deletado
    // É possível fazer algo melhor, fazendo uma deleção invisível, mas aumenta um pouco a complexidade
    await prisma.$transaction([
        prisma.access.deleteMany({ where: { userId: userId } }),
        prisma.user.delete({ where: { id: userId } })       
    ]);
}

async function getByEmail(userEmail) {   
    const user = await prisma.user.findFirst({
        where: { email: userEmail },
        include: {
            sector: true,
            profile: true
        }
    });

    return user;
}

export default {
    listAll,
    getById,
    create,
    update,
    deleteUser,
    getByEmail
};