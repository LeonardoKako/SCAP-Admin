import prisma from '../../database/prisma.js';
import { appError } from '../../errors/appError.js';
import { AccessType } from '@prisma/client';
import userService from "../user/userService.js";

async function listAll() {
    const access = await prisma.access.findMany({
        include: {
            user: {
                include: {
                    sector: true
                }
            }
        },
        orderBy: {
            dateTime: 'desc'
        }
    });
    return access;
}

async function getById(accessId) {
    const id = Number(accessId);

    if (isNaN(id)) {
        throw new appError("O id deve ser um número válido", "INVALID_ID", 400);
    }

    const access = await prisma.access.findUnique({
        where: { id: id }
    })

    if (!access) {
        throw new appError("ID não corresponde a nenhum acesso", "ACCESS_NOT_FOUND", 404);
    }

    return access;
}

async function create(accessBody) {

    const { userId } = accessBody;

    if (!userId) {
        throw new appError("O campo userId é obrigatório", "MISSING_FIELDS", 400);
    }

    // usa método do userService para validar
    await userService.getById(userId);

    const lastType = await prisma.access.findFirst({
        where: { userId: userId },
        orderBy: { dateTime: 'desc' }
    });

    let currentType;

    if (!lastType) {
        currentType = AccessType.ENTRY;
    }
    else if (lastType && lastType.type === AccessType.ENTRY) {
        currentType = AccessType.EXIT;
    }
    else {
        currentType = AccessType.ENTRY;
    }

    const access = await prisma.access.create({
        data: {
            userId: userId,
            type: currentType
        }
    });

    return access;
}

async function update(accessBody, accessId) {
    const { dateTime } = accessBody;

    const id = Number(accessId);

    if (isNaN(id)) {
        throw new appError("O id do acesso deve ser um número válido", "INVALID_ID", 400);
    }

    if (typeof dateTime !== 'string') {
        throw new appError("O campo de dateTime deve ser um texto (string) no formato ISO",
            "INVALID_TYPE", 400);
    }

    if (!dateTime || dateTime.trim().length === 0) {
        throw new appError("O campo de dateTime é obrigatório para atualização", "MISSING_FIELDS", 400);
    }

    // Formata depois de validar
    const updatedDateTime = new Date(dateTime);

    if (isNaN(updatedDateTime.getTime())) {
        throw new appError("O formato da data e hora não é válido", "INVALID_FORMAT", 400);
    }

    // confere se a data/horário é no futuro
    if (updatedDateTime > new Date()) {
        throw new appError("A data e hora não pode estar no futuro.", "FUTURE_DATE", 400);
    }

    const currentAccess = await getById(id);
    if (!currentAccess) {
        throw new appError("Não é possível atualizar o acesso, porque o id não corresponde a nenhum acesso!",
            "ACCESS_NOT_FOUND", 404);
    }

    const previousAccess = await getPreviousAccess(currentAccess.userId, currentAccess.dateTime);
    const followingAccess = await getFollowingAccess(currentAccess.userId, currentAccess.dateTime);
    console.warn("Following access: " + followingAccess);

    if (previousAccess && updatedDateTime < new Date(previousAccess.dateTime)) {
        throw new appError("A data do acesso não pode ser anterior ao acesso imediatamente anterior",
            "INVALID_ACCESS_CHRONOLOGY", 400);
    }
    if (followingAccess && updatedDateTime > new Date(followingAccess.dateTime)) {
        throw new appError("A data do acesso não pode ser posterior ao acesso imediatamente posterior",
            "INVALID_ACCESS_CHRONOLOGY", 400);
    }

    const updatedAccess = await prisma.access.update({
        where: { id: id },
        data: {
            dateTime: updatedDateTime
        }
    });

    return updatedAccess;
}

async function getPreviousAccess(userId, dateTime) {
    // buscar por AccessId para pegar o registro
    const previousAccess = await prisma.access.findFirst({
        where: {
            userId: userId,
            dateTime: {
                lt: dateTime
            }
        },
        orderBy: {
            dateTime: 'desc'
        },
        take: 1 // equivalente ao LIMIT no sql
    });

    return previousAccess;
}

async function getFollowingAccess(userId, dateTime) {
    const followingAccess = await prisma.access.findFirst({
        where: {
            userId: userId,
            dateTime: {
                gt: dateTime
            },
        },
        orderBy: {
            dateTime: 'asc'
        },
        take: 1
    });

    return followingAccess;
}

export default {
    listAll,
    getById,
    create,
    update
};