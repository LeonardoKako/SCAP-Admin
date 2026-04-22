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

export default {
    listAll
};