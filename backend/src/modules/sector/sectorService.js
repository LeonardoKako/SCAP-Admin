import { PrismaClient } from '@prisma/client';
import { appError } from '../../errors/appError.js';

const prisma = new PrismaClient();

async function listAll() {
    try {
         const sectors = await prisma.sector.findMany();
        return sectors;
    }
    catch(error) {
        throw new Error("Falha ao listar setores.");
    }    
}

async function getById(sectorId) {  
    const sector = await prisma.sector.findUnique({
        where: { id: sectorId },
    });

    if (sector === null) {
        throw new appError("ID não corresponde a nenhum setor.", "SECTOR_NOT_FOUND", 404)
    }

    return sector;
}

async function create(sectorName) {
    const sector = await prisma.sector.create({
        data: {
            name: sectorName
        }
    });

    return sector;
}

async function update(sectorBody, sectorId){
    const { name } = sectorBody;

    const updatedSector = await prisma.sector.update({
        where : { id: sectorId },
        data: {
            name: name
        }
    });

    return updatedSector;
}

async function getByName(sectorName) {
    const sector = await prisma.sector.findFirst({
        where : { name: sectorName }
    });

    return sector;
}

export default {
    listAll,
    getById,
    create,
    update,
    getByName
};