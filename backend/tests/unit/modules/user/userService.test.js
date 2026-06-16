import { beforeAll, beforeEach, describe, expect, jest } from '@jest/globals';

const mockPrisma = {
    user: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn()
    },
    access: {
        deleteMany: jest.fn(),
    },
    $transaction: jest.fn(),
};

jest.unstable_mockModule('../../../../src/database/prisma.js', () => ({
    default: mockPrisma
}));

jest.unstable_mockModule('bcrypt', () => ({
    default: {
        hash: jest.fn().mockResolvedValue('hashed_password'),
    },
}));

let userService;

beforeAll(async () => {
    const module = await import('../../../../src/modules/user/userService.js');
    userService = module.default;
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe('listAll', () => {
    it('deve listar todos os usuários', async () => {
        const fakeUsers = [{ id: 1, name: "Caio" }];
        mockPrisma.user.findMany.mockResolvedValue(fakeUsers);

        const result = await userService.listAll();

        expect(result).toEqual(fakeUsers);
        expect(mockPrisma.user.findMany).toHaveBeenCalled();
    });
});

describe('getById', () => {
    it('deve listar usuário por id', async () => {
        const fakeUser = { id: 1, name: "Caio" };

        // Cenário 1
        mockPrisma.user.findUnique.mockResolvedValue(fakeUser);

        const result = await userService.getById(fakeUser.id);

        expect(result).toEqual(fakeUser);
        expect(mockPrisma.user.findUnique).toHaveBeenCalled();

        // Cenário 2
        mockPrisma.user.findUnique.mockResolvedValue(null);

        await expect(userService.getById(999)).rejects.toThrow();

        // Cenário 3
        await expect(userService.getById("string")).rejects.toThrow();
    });
});

describe('create', () => {
    it('deve criar usuário', async () => {
        const fakeUserBody = { 
            name: "Caio", 
            email: "caio@gmail.com", 
            sectorId: 1, 
            profileId: 1, 
            password: "123"
        };

        const fakeCreatedUser = {
            id: 1,
            ...fakeUserBody
        }

        mockPrisma.user.create.mockResolvedValue(fakeCreatedUser);
        const result = await userService.create(fakeUserBody);

        expect(result).toEqual({
            id: 1,
            name: "Caio",
            email: "caio@gmail.com",
            sectorId: 1,
            profileId: 1
        });
        expect(result).not.toHaveProperty('password');
        expect(mockPrisma.user.create).toHaveBeenCalled();
    });
});

describe('create - validation', () => {
    const validUser = {
        id: 1,
        name: "Caio", 
        email: "caio@gmail.com", 
        sectorId: 1, 
        profileId: 1, 
        password: "123"
    }

    it('deve lançar erro se nome não for string', async () => {
        const invalidBody = { ...validUser, name: 12 }

        await expect(userService.create(invalidBody)).rejects.toThrow();
    });

    it('deve lançar erro se senha não for string', async () => {
        const invalidBody = { ...validUser, password: 12 }

        await expect(userService.create(invalidBody)).rejects.toThrow();
    });

    it('deve lançar erro se profile ou sector não for preenchido', async () => {
        const invalidBody = { ...validUser, profileId: '' }

        await expect(userService.create(invalidBody)).rejects.toThrow();
    });

    it('deve lançar erro se profile ou sector não for número', async () => {
        const invalidBody = { ...validUser, profileId: true }

        await expect(userService.create(invalidBody)).rejects.toThrow();
    });

    it('deve lançar erro se nome estiver vazio', async () => {
        const invalidBody = { ...validUser, name: ' ' }

        await expect(userService.create(invalidBody)).rejects.toThrow();
    });

    it('deve lançar erro se email estiver vazio', async () => {
        const invalidBody = { ...validUser, email: ' ' }

        await expect(userService.create(invalidBody)).rejects.toThrow();
    });

    it('deve lançar erro se email não tiver formato correto', async () => {
        const invalidBody = { ...validUser, email: 'caiogmail.com' }

        await expect(userService.create(invalidBody)).rejects.toThrow();
    });

    it('deve lançar erro se senha estiver vazia', async () => {
        const invalidBody = { ...validUser, password: ' ' }

        await expect(userService.create(invalidBody)).rejects.toThrow();
    });
});

describe('update', () => {
    it('deve atualizar usuário', async() => {
        const fakeUserBody = {
            name: "Caio", 
            email: "caio@gmail.com", 
            sectorId: 1, 
            profileId: 1, 
            password: "123"
        }

        const fakeUpdatedUser = {
            id: 1,
            name: "Caio", 
            email: "caio@gmail.com", 
            sectorId: 1, 
            profileId: 1, 
            password: "123"
        }

        mockPrisma.user.findUnique.mockResolvedValue(fakeUpdatedUser);

        mockPrisma.user.update.mockResolvedValue(fakeUpdatedUser);

        const result = await userService.update(fakeUserBody, fakeUpdatedUser.id);

        expect(result).toEqual({
            id: 1,
            name: "Caio", 
            email: "caio@gmail.com", 
            sectorId: 1, 
            profileId: 1, 
            password: "123"
        });
        expect(mockPrisma.user.update).toHaveBeenCalled();

        await expect(userService.update(fakeUserBody, "string")).rejects.toThrow();
    });
});

describe('update - validation', () => {
    const validUser = {
        id: 1,
        name: "Caio", 
        email: "caio@gmail.com", 
        sectorId: 1, 
        profileId: 1, 
        password: "123"
    }

    it('deve lançar erro se nome não for string', async () => {
        const invalidBody = { ...validUser, name: 12 }

        await expect(userService.update(invalidBody, validUser.id)).rejects.toThrow();
    });

    it('deve lançar erro se senha não for string', async () => {
        const invalidBody = { ...validUser, password: 12 }

        await expect(userService.update(invalidBody, validUser.id)).rejects.toThrow();
    });

    it('deve lançar erro se profile ou sector não for preenchido', async () => {
        const invalidBody = { ...validUser, profileId: '' }

        await expect(userService.update(invalidBody, validUser.id)).rejects.toThrow();
    });

    it('deve lançar erro se profile ou sector não for número', async () => {
        const invalidBody = { ...validUser, profileId: true }

        await expect(userService.update(invalidBody, validUser.id)).rejects.toThrow();
    });

    it('deve lançar erro se nome estiver vazio', async () => {
        const invalidBody = { ...validUser, name: ' ' }

        await expect(userService.update(invalidBody, validUser.id)).rejects.toThrow();
    });

    it('deve lançar erro se email estiver vazio', async () => {
        const invalidBody = { ...validUser, email: ' ' }

        await expect(userService.update(invalidBody, validUser.id)).rejects.toThrow();
    });

    it('deve lançar erro se email não tiver formato correto', async () => {
        const invalidBody = { ...validUser, email: 'caiogmail.com' }

        await expect(userService.update(invalidBody, validUser.id)).rejects.toThrow();
    });

    it('deve lançar erro se senha estiver vazia', async () => {
        const invalidBody = { ...validUser, password: ' ' }

        await expect(userService.update(invalidBody, validUser.id)).rejects.toThrow();
    });
});

describe('deleteUser', () => {
    it('deve deletar usuário', async() => {
        const fakeDeletedUser = {
            id: 1,
            name: "Caio"
        }

        const fakeDeletedUserError = {
            id: true,
            name: "Caio"
        }

        mockPrisma.user.findUnique.mockResolvedValue(fakeDeletedUser);

        mockPrisma.$transaction.mockResolvedValue([
            { count: 1 },
            fakeDeletedUser
        ]);

        const result = await userService.deleteUser(fakeDeletedUser.id);

        expect(result).toBeUndefined();
        expect(mockPrisma.user.delete).toHaveBeenCalled();

        await expect(userService.deleteUser("string")).rejects.toThrow();
    });
});

describe('get by email', () => {
    it('deve retornar usuário por email', async () => {
        const fakeUser = {
            id: 1,
            name: "Caio",
            email: "caio@gmail.com"
        }

        mockPrisma.user.findFirst.mockResolvedValue(fakeUser);

        const result = await userService.getByEmail(fakeUser.email);
        expect(mockPrisma.user.findFirst).toHaveBeenCalled();
    });
});