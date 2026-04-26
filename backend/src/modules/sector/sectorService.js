import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function listAll() {
    
    try {
         const sectors = await prisma.sector.findMany();
        return sectors;
    }
    catch(error) {
        throw new Error("Falha ao listar setores");
    } 
    
}

async function getById(sectorId) {
    
    try {
        const sector = await prisma.sector.findUnique({
            where: { id: sectorId },
        })

        return sector;

    } catch(error) {
        throw new Error("Falha ao buscar setor");
    }
}

export default {
    listAll,
    getById
};