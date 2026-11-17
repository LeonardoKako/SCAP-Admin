import prisma from '../../database/prisma.js';
import { appError } from "../../errors/appError.js";
import bcrypt from 'bcrypt';

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

async function resolveProfileId(inputProfileId) {
    if (!inputProfileId) {
        return null;
    }
    const str = String(inputProfileId).trim();
    if (prisma.profile) {
        const profileMap = {
            '1': 'Supervisor do Sistema',
            '2': 'Técnico de Segurança',
            '3': 'Gestor de Contas',
            '4': 'Consultor Comercial'
        };
        if (profileMap[str]) {
            try {
                const found = await prisma.profile.findFirst({ where: { name: profileMap[str] } });
                if (found) {
                    return found.id;
                }
            } catch {
                // ignora
            }
        }
        try {
            const byId = await prisma.profile.findUnique({ where: { id: str } });
            if (byId) {
                return byId.id;
            }
        } catch {
            // ignora
        }
    }
    return str;
}

async function listAll() {
    const users = await prisma.user.findMany({
        include: {
            sector: true,
            profile: true
        }
    });
    return users; 
}

async function getById(userId) {
    const id = validateId(userId);

    const user = await prisma.user.findUnique({
        where: { id: id },
    });

    if (!user) {
        throw new appError("ID não corresponde a nenhum usuário", "USER_NOT_FOUND", 404);
    }
        
    return user; 
}

async function create(userBody) {
    const { name, email, password, profileId, sectorId } = userBody;

    if (typeof name !== 'string' || typeof email !== 'string') {
        throw new appError("O nome e o email devem ser uma string", "INVALID_FORMAT", 400);
    }

    if (typeof password !== 'string') {
        throw new appError("A senha deve ser uma string", "INVALID_FORMAT", 400);
    }

    const cleanName = name.trim();
    const cleanPassword = password.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!profileId || !sectorId) {
        throw new appError("Perfil ou setor não foi preenchido para esse usuário!",
                            "MISSING_FIELDS", 400);
    }

    if (typeof profileId !== 'number' && typeof profileId !== 'string') {
        throw new appError("Os IDs de perfil e setor devem ser números ou strings válidas",
                        "INVALID_FORMAT", 400);
    }

    if (typeof sectorId !== 'number' && typeof sectorId !== 'string') {
        throw new appError("Os IDs de perfil e setor devem ser números ou strings válidas",
                        "INVALID_FORMAT", 400);
    }

    if (!cleanName || cleanName.length === 0) {
        throw new appError("O nome não pode estar vazio ou ter apenas espaços.",
                        "INVALID_NAME", 400);
    }

    if (!cleanEmail || cleanEmail.length === 0) {
        throw new appError("O email não pode estar vazio ou ter apenas espaços.",
                            "INVALID_EMAIL", 400);
    }

    if (!cleanEmail.includes("@")) {
        throw new appError("O formato do email não é válido", "INVALID_EMAIL_FORMAT", 400);
    }

    if (!cleanPassword || cleanPassword.length === 0) {
        throw new appError("O senha não pode estar vazia ou ter apenas espaços.",
                            "INVALID_PASSWORD", 400);
    }

    // Verifica se email já existe
    const verifyExistingEmail = await getByEmail(cleanEmail);

    if (verifyExistingEmail) {
        throw new appError("Esse email já está cadastrado!", "EMAIL_ALREADY_EXISTS", 409);
    }

    const actualProfileId = await resolveProfileId(profileId);
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name: cleanName,
            email: cleanEmail,
            password: hashPassword,
            profileId: typeof profileId === 'number' ? profileId : actualProfileId,
            sectorId: sectorId
        }
    });

    const { password: _, ...newUser } = user;

    return newUser;
}

async function update(userBody, userId) {
    const { name, email, password, profileId, sectorId } = userBody;
    const id = validateId(userId);

    // Verifica se o usuário existe
    await getById(id);

    if (typeof name !== 'string' || typeof email !== 'string') {
        throw new appError("O nome e o email devem ser uma string", "INVALID_FORMAT", 400);
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!profileId || !sectorId) {
        throw new appError("Perfil ou setor não foi preenchido para esse usuário!",
                            "MISSING_FIELDS", 400);
    }

    if (typeof profileId !== 'number' && typeof profileId !== 'string') {
        throw new appError("Os IDs de perfil e setor devem ser números ou strings válidas",
                        "INVALID_FORMAT", 400);
    }

    if (typeof sectorId !== 'number' && typeof sectorId !== 'string') {
        throw new appError("Os IDs de perfil e setor devem ser números ou strings válidas",
                        "INVALID_FORMAT", 400);
    }

    if (!cleanName || cleanName.length === 0) {
        throw new appError("O nome não pode estar vazio ou ter apenas espaços.",
                        "INVALID_NAME", 400);
    }

    if (!cleanEmail || cleanEmail.length === 0) {
        throw new appError("O email não pode estar vazio ou ter apenas espaços.",
                            "INVALID_EMAIL", 400);
    }

    if (!cleanEmail.includes("@")) {
        throw new appError("O formato do email não é válido", "INVALID_EMAIL_FORMAT", 400);
    }

    const verifyExistingEmail = await getByEmail(cleanEmail);

    if (verifyExistingEmail && String(verifyExistingEmail.id) !== id) {
        throw new appError("Esse email já está cadastrado!", "EMAIL_ALREADY_EXISTS", 409);
    }

    const actualProfileId = await resolveProfileId(profileId);

    const updateData = {
        name: cleanName,
        email: cleanEmail,
        profileId: typeof profileId === 'number' ? profileId : actualProfileId,
        sectorId: sectorId
    };

    if (password) {
        if (typeof password !== 'string' || password.trim().length === 0) {
            throw new appError("A nova senha deve ser uma string válida", "INVALID_FORMAT", 400);
        }
        updateData.password = await bcrypt.hash(password.trim(), 10);
    }

    const updatedUser = await prisma.user.update({
        where: { id: id },
        data: updateData
    });

    return updatedUser;
}

async function deleteUser(userId) {
    const id = validateId(userId);

    // Já trata erro se não existir
    await getById(id);

    await prisma.$transaction([
        prisma.access.deleteMany({ where: { userId: id } }),
        prisma.user.delete({ where: { id: id } })       
    ]);
}

async function getByEmail(userEmail) {   
    const user = await prisma.user.findFirst({
        where: { email: userEmail },
        include: {
            sector: true,
            profile: true
        }
    });

    return user;
}

export default {
    listAll,
    getById,
    create,
    update,
    deleteUser,
    getByEmail
};
