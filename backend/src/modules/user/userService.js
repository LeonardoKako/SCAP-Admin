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

export default {
    listAll,
    getById
};