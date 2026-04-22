import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listAll() {
    try {
         const sectors = await prisma.sector.findMany();
        return sectors;
    }
    catch(error) {
        throw error;
    } 
}

export default {
    listAll
};