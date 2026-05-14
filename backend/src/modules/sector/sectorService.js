import prisma from '../../database/prisma.js';
import { appError } from '../../errors/appError.js';

async function listAll() {
         const sectors = await prisma.sector.findMany();
        return sectors;    
}

async function getById(sectorId) {  
    const sector = await prisma.sector.findUnique({
        where: { id: sectorId },
    });

    if (sector === null) {
        throw new appError("ID não corresponde a nenhum setor.", "SECTOR_NOT_FOUND", 404);
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

async function deleteSector(sectorId) {
    const id = Number(sectorId);
    if(isNaN(id)) {
        throw new appError("Esse ID deve ser um número é válido", "INVALID_ID", 400);
    }
    // Já trata erro na função 
    await getById(sectorId);

    const usersCount = await getNumberOfLinkedUsers(sectorId);
    if(usersCount > 0) {
        throw new appError(`Esse setor possui ${usersCount} usuários vinculados a ele. Não é possível deletar!`,
                        "CONFLICT", 409);
    }

    await prisma.sector.delete({
        where: { id: sectorId }
    });
}  


async function getByName(sectorName) {
    const sector = await prisma.sector.findFirst({
        where : { name: sectorName }
    });

    return sector;
}

async function getNumberOfLinkedUsers(sectorId) {
    const count = await prisma.user.count({
         where: { sectorId: sectorId }
    });

    return count;
}

export default {
    listAll,
    getById,
    create,
    update,
    deleteSector,
    getByName
};