import prisma from '../../database/prisma.js';
import { appError } from '../../errors/appError.js';

async function listAll() {
        const access = await prisma.access.findMany();
        return access;
}

async function getById(accessId) {
        const access = await prisma.access.findUnique({
            where: { id: accessId }
        })

        return access;   
}

async function create(accessBody) {
    
    const { userId } = accessBody;

    const lastType = await prisma.access.findFirst({
        where: { userId: userId },
        orderBy: { dateTime: 'desc'}
    });

    let currentType; 

    if(!lastType) {
        currentType = AccessType.ENTRY;
    } 
    else if(lastType && lastType.type === AccessType.ENTRY) {
        currentType = AccessType.EXIT;
    }
    else {
        currentType = AccessType.ENTRY;
    }

    const access = await prisma.access.create({
        data: {
            userId : userId,
            type: currentType
        }
    });

    return access;
}

async function update(accessBody, accessId) {
    const { dateTime } = accessBody;
    const updatedDateTime = new Date(dateTime);

    const currentAccess = await getById(accessId);
    if(!currentAccess) {
        throw new appError("Não é possível atualizar o acesso, porque o id não corresponde a nenhum acesso!",
                             "ACCESS_NOT_FOUND", 404);
    }

    const previousAccess = await getPreviousAccess(currentAccess.userId, currentAccess.dateTime);
    const followingAccess = await getFollowingAccess(currentAccess.userId, currentAccess.dateTime);
    console.log("Following access: " + followingAccess);
    
    if(previousAccess && updatedDateTime < new Date(previousAccess.dateTime)) {
        throw new appError("A data do acesso não pode ser anterior ao acesso imediatamente anterior",
                             "INVALID_ACCESS_CHRONOLOGY", 400);
    }
    if(followingAccess && updatedDateTime > new Date(followingAccess.dateTime)) {
        throw new appError("A data do acesso não pode ser posterior ao acesso imediatamente posterior",
                             "INVALID_ACCESS_CHRONOLOGY", 400);
    }

    const updatedAccess = await prisma.access.update({
        where: { id: accessId },
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