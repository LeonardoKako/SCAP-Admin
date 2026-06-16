import { beforeAll, beforeEach, describe, expect, jest } from '@jest/globals';
import { AccessType } from '@prisma/client';

const mockPrisma = {
    access: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn(),
        count: jest.fn()
    },
    user: {
        findUnique: jest.fn()
    },
    $transaction: jest.fn(),
};

jest.unstable_mockModule('../../../../src/database/prisma.js', () => ({
    default: mockPrisma
}));

let accessService;

beforeAll(async () => {
    const module = await import('../../../../src/modules/access/accessService.js');
    accessService = module.default;
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe('listAll', () => {
    it('deve listar acesso', async () => {
        const fakeAccess = [{ id: 1, userId: 1, accessType: "EXIT" }];
        mockPrisma.access.findMany.mockResolvedValue(fakeAccess);

        const result = await accessService.listAll();

        expect(result).toEqual(fakeAccess);
        expect(mockPrisma.access.findMany).toHaveBeenCalled();
    });
});

describe('getById', () => {
    it('deve listar acesso por id', async () => {
        const fakeAccess = { id: 1, userId: 1, accessType: "EXIT" };

        // Cenário 1
        mockPrisma.access.findUnique.mockResolvedValue(fakeAccess);

        const result = await accessService.getById(fakeAccess.id);

        expect(result).toEqual(fakeAccess);
        expect(mockPrisma.access.findUnique).toHaveBeenCalled();

        // Cenário 2
        mockPrisma.access.findUnique.mockResolvedValue(null);

        await expect(accessService.getById(999)).rejects.toThrow();

        // Cenário 3
        await expect(accessService.getById("string")).rejects.toThrow();
    });
});

describe('create', () => {
    it('deve criar acesso', async () => {
        const fakeAccessBody = { 
            userId: 1,
            accessType: "EXIT"
        };

        const fakeCreatedAccess = {
            id: 1,
            ...fakeAccessBody
        }

        mockPrisma.user.findUnique.mockResolvedValue(fakeAccessBody.userId);

        mockPrisma.access.create.mockResolvedValue(fakeCreatedAccess);

        const result = await accessService.create(fakeAccessBody);

        expect(result).toEqual({
            id: 1,
            userId: 1,
            accessType: "EXIT"
        });
        expect(mockPrisma.access.create).toHaveBeenCalled();
    });
});

describe('create - validation', () => {
    const validAccess = {
        id: 1,
        userId: 1,
        accessType: "EXIT"
    }

    it('deve lançar erro se userId estiver vazio', async () => {
        const invalidBody = { ...validAccess, userId: "" }

        await expect(accessService.create(invalidBody)).rejects.toThrow();
    });
});

describe('currentType logic', () => {
    const fakeAccessBody = { 
            userId: 1
    };

    it('deve retornar ENTRY se não houver lastType', async () => {
        mockPrisma.access.findFirst.mockResolvedValue(null);
        mockPrisma.access.create.mockResolvedValue({ type: AccessType.ENTRY, userId: 1 });

        const result = await accessService.create(fakeAccessBody);

        expect(result.type).toBe(AccessType.ENTRY);
    });

    it('deve retornar EXIT se o último acesso foi ENTRY', async () => {
        mockPrisma.access.findFirst.mockResolvedValue({ type: AccessType.ENTRY });
        mockPrisma.access.create.mockResolvedValue({ type: AccessType.EXIT, userId: 1 });

        const result = await accessService.create(fakeAccessBody);

        expect(result.type).toBe(AccessType.EXIT);
    });

    it('deve retornar ENTRY se o último acesso foi EXIT', async () => {
        mockPrisma.access.findFirst.mockResolvedValue({ type: AccessType.EXIT });
        mockPrisma.access.create.mockResolvedValue({ type: AccessType.ENTRY, userId: 1 });

        const result = await accessService.create(fakeAccessBody);

        expect(result.type).toBe(AccessType.ENTRY);
    });
});

describe('update', () => {
    it('deve atualizar acesso', async() => {
        const fakeAccessBody = {
            userId: 1,
            accessType: "EXIT",
            dateTime: "2026-01-01"
        }

        const fakeUpdatedAccess = {
            id: 1,
            userId: 1,
            accessType: "EXIT",
            dateTime: "2026-01-01"
        }

        mockPrisma.access.findUnique.mockResolvedValue(fakeUpdatedAccess);

        mockPrisma.access.update.mockResolvedValue(fakeUpdatedAccess);

        const result = await accessService.update(fakeAccessBody, fakeUpdatedAccess.id);

        expect(result).toEqual({
            id: 1,
            userId: 1,
            accessType: "EXIT",
            dateTime: "2026-01-01"
        });
        expect(mockPrisma.access.update).toHaveBeenCalled();

        await expect(accessService.update(fakeAccessBody, "string")).rejects.toThrow();
    });
});

describe('update - validation', () => {
    const validAccess = {
        id: 1,
        userId: 1,
        accessType: "EXIT",
        dateTime: "2026-01-01"
    }

    it('deve lançar erro se datetime não for string', async () => {
        const invalidBody = { ...validAccess, dateTime: 12 };

        await expect(accessService.update(invalidBody, validAccess.id)).rejects.toThrow();
    });

    it('deve lançar erro se datetime estiver vazio', async () => {
        const invalidBody = { ...validAccess, dateTime: "" };

        await expect(accessService.update(invalidBody, validAccess.id)).rejects.toThrow();
    });

    it('deve lançar erro se datetime estiver com formato inválido', async () => {
        const invalidBody = { ...validAccess, dateTime: "string" };

        await expect(accessService.update(invalidBody, validAccess.id)).rejects.toThrow();
    });

});
