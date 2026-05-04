import { AccessType, PrismaClient } from '@prisma/client';
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

export default {
    listAll,
    getById,
    create
};