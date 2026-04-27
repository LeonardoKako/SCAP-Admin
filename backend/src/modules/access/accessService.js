import { PrismaClient } from '@prisma/client';
import { appError } from '../../errors/appError.js';

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

        const access = await prisma.access.findUnique({
            where: { id: accessId }
        })

        if(access === null){
            throw new appError("ID não corresponde a nenhum acesso", "ACCESS_NOT_FOUND", 404);
        }

        return access;   
}

export default {
    listAll,
    getById
};