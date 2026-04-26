import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listAll() {
    
    try {
        const access = await prisma.access.findMany();
        return access;
    }
    catch(error) {
        throw error;
    }
}

async function getById(accessId) {

    try {

        const access = await prisma.access.findUnique({
            where: { id: accessId }
        })

        return access;

    } catch(error) {
        throw new Error("Falha ao buscar accesso.");
    }
    
}

export default {
    listAll,
    getById
};