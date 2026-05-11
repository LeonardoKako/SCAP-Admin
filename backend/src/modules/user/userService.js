import { PrismaClient } from "@prisma/client";
import { appError } from "../../errors/appError.js";

const prisma = new PrismaClient();

async function listAll() {
   
    try {
        const users = await prisma.user.findMany();
        return users;
    }
    catch(error) {
        throw new Error("Falha ao listar usuários")
    }
    
}

async function getById(userId) {

     const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if(user === null){
        throw new appError("ID não corresponde a nenhum usuário", "USER_NOT_FOUND", 404);
    }
        
    return user; 
}

async function create(userBody) {
    const { name, email, profileId, sectorId } = userBody;

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            profileId: profileId,
            sectorId: sectorId
        }
    });

    return user;
}

async function update(userBody, userId) {
    const { name, email, profileId, sectorId } = userBody;
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
    const deletedUser = await prisma.$transaction([
        prisma.access.deleteMany({ where: { userId: userId } }),
        prisma.user.delete({ where: { id: userId } })       
    ]);
}

async function getByEmail(userEmail) {   
    const user = await prisma.user.findFirst({
        where: { email: userEmail }
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