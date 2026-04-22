import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function listAll() {
    try {
        const users = await prisma.user.findMany();
        return users;
    }
    catch(error) {
        throw error;
    }
}

export default {
    listAll
};