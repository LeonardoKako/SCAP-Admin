import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function listAll() {
   
    try {
        const users = await prisma.user.findMany();
        return users;
    }
    catch(error) {
        throw error;
    }
    
}

async function getById(userId) {

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        })
        
        return user;
        
    } catch (error) {
        throw new Error("Falha ao buscar usuário.")
    }
    
}

export default {
    listAll,
    getById
};