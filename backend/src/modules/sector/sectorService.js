import prisma from '../../database/prisma.js';
import { appError } from '../../errors/appError.js';

function validateId(id) {
    if (id === null || id === undefined || (typeof id !== 'string' && typeof id !== 'number')) {
        throw new appError("Esse ID deve ser válido.", "INVALID_ID", 400);
    }
    const str = String(id).trim();
    if (str.length === 0 || (isNaN(Number(str)) && !/^[0-9a-fA-F]{24}$/.test(str))) {
        throw new appError("Esse ID deve ser válido.", "INVALID_ID", 400);
    }
    return str;
}

async function listAll() {
    const sectors = await prisma.sector.findMany();
    return sectors;    
}

async function getById(sectorId) {  
    const id = validateId(sectorId);

    const sector = await prisma.sector.findUnique({
        where: { id: id },
    });

    if (!sector) {
        throw new appError("ID não corresponde a nenhum setor.", "SECTOR_NOT_FOUND", 404);
    }

    return sector;
}

async function create(sectorBody) {
    const { name } = sectorBody;
    if (typeof name !== 'string') {
        throw new appError("O nome do setor deve ser uma string", "INVALID_TYPE", 400);
    }

    if (!name || name.trim().length === 0) {
        throw new appError("Nome está vazio ou contém apenas espaço", "INVALID_NAME", 400);
    }

    const cleanName = name.trim();

    // Verifica se já existe o nome
    const verifySectorName = await getByName(cleanName);

    if (verifySectorName) {
        throw new appError(`O setor ${cleanName} já está cadastrado!`, "SECTOR_ALREADY_EXISTS", 409);
    }

    const sector = await prisma.sector.create({
        data: {
            name: cleanName
        }
    });
    return sector;
}

async function update(sectorBody, sectorId) {
    const { name } = sectorBody;
    const id = validateId(sectorId);

    // Verifica se existe
    await getById(id);

    if (typeof name !== 'string') {
        throw new appError("O nome do setor deve ser uma string", "INVALID_TYPE", 400);
    }

    if (!name || name.trim().length === 0) {
        throw new appError("Nome está vazio ou contém apenas espaço", "INVALID_NAME", 400);
    }

    const cleanName = name.trim();

    // Verifica se já existe o nome
    const verifySectorName = await getByName(cleanName);

    if (verifySectorName && verifySectorName.id !== id) {
        throw new appError(`O setor ${cleanName} já está cadastrado!`, "SECTOR_ALREADY_EXISTS", 409);
    }

    const updatedSector = await prisma.sector.update({
        where: { id: id },
        data: {
            name: cleanName
        }
    });

    return updatedSector;
}

async function deleteSector(sectorId) {
    const id = validateId(sectorId);

    // Já trata erro na função 
    await getById(id);

    const usersCount = await getNumberOfLinkedUsers(id);
    if (usersCount > 0) {
        throw new appError(`Esse setor possui ${usersCount} usuários vinculados a ele. Não é possível deletar!`,
                        "CONFLICT", 409);
    }

    await prisma.sector.delete({
        where: { id: id }
    });
}  

async function getByName(sectorName) {
    const sector = await prisma.sector.findFirst({
        where: { name: sectorName }
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
