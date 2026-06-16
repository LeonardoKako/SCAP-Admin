import { beforeAll, beforeEach, describe, expect, jest } from '@jest/globals';

const mockPrisma = {
    sector: {
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
        count: jest.fn()
    },
    $transaction: jest.fn(),
};

jest.unstable_mockModule('../../../../src/database/prisma.js', () => ({
    default: mockPrisma
}));

let sectorService;

beforeAll(async () => {
    const module = await import('../../../../src/modules/sector/sectorService.js');
    sectorService = module.default;
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe('listAll', () => {
    it('deve listar setores', async () => {
        const fakeSectors = [{ id: 1, name: "Administrativo" }];
        mockPrisma.sector.findMany.mockResolvedValue(fakeSectors);

        const result = await sectorService.listAll();

        expect(result).toEqual(fakeSectors);
        expect(mockPrisma.sector.findMany).toHaveBeenCalled();
    });
});

describe('getById', () => {
    it('deve listar setor por id', async () => {
        const fakeSector = { id: 1, name: "Administrativo" };

        // Cenário 1
        mockPrisma.sector.findUnique.mockResolvedValue(fakeSector);

        const result = await sectorService.getById(fakeSector.id);

        expect(result).toEqual(fakeSector);
        expect(mockPrisma.sector.findUnique).toHaveBeenCalled();

        // Cenário 2
        mockPrisma.sector.findUnique.mockResolvedValue(null);

        await expect(sectorService.getById(999)).rejects.toThrow();

        // Cenário 3
        await expect(sectorService.getById("string")).rejects.toThrow();
    });
});

describe('create', () => {
    it('deve criar setor', async () => {
        const fakeSectorBody = { 
            name: "Administrativo"
        };

        const fakeCreatedSector = {
            id: 1,
            ...fakeSectorBody
        }

        mockPrisma.sector.create.mockResolvedValue(fakeCreatedSector);
        const result = await sectorService.create(fakeSectorBody);

        expect(result).toEqual({
            id: 1,
            name: "Administrativo"
        });
        expect(mockPrisma.sector.create).toHaveBeenCalled();
    });
});

describe('create - validation', () => {
    const validSector = {
        id: 1,
        name: "Administrativo"
    }

    it('deve lançar erro se nome não for string', async () => {
        const invalidBody = { ...validSector, name: 12 }

        await expect(sectorService.create(invalidBody)).rejects.toThrow();
    });

    it('deve lançar erro se nome estiver vazio', async () => {
        const invalidBody = { ...validSector, name: ' ' }

        await expect(sectorService.create(invalidBody)).rejects.toThrow();
    });
});

describe('update', () => {
    it('deve atualizar acesso', async() => {
        const fakeSectorBody = {
            name: "Administrativo", 
        }

        const fakeUpdatedSector = {
            id: 1,
            name: "Administrativo",
        }

        mockPrisma.sector.findUnique.mockResolvedValue(fakeUpdatedSector);

        mockPrisma.sector.update.mockResolvedValue(fakeUpdatedSector);

        const result = await sectorService.update(fakeSectorBody, fakeUpdatedSector.id);

        expect(result).toEqual({
            id: 1,
            name: "Administrativo"
        });
        expect(mockPrisma.sector.update).toHaveBeenCalled();

        await expect(sectorService.update(fakeSectorBody, "string")).rejects.toThrow();
    });
});

describe('update - validation', () => {
    const validSector = {
        id: 1,
        name: "Administrativo"
    }

    it('deve lançar erro se nome não for string', async () => {
        const invalidBody = { ...validSector, name: 12 }

        await expect(sectorService.update(invalidBody, validSector.id)).rejects.toThrow();
    });

    it('deve lançar erro se nome estiver vazio', async () => {
        const invalidBody = { ...validSector, name: ' ' }

        await expect(sectorService.update(invalidBody, validSector.id)).rejects.toThrow();
    });
});

describe('deleteSector', () => {
    it('deve deletar setor', async() => {
        const fakeDeletedSector = {
            id: 1,
            name: "Administrativo"
        }

        const fakeDeletedSectorError = {
            id: true,
            name: "Administrativo"
        }

        mockPrisma.sector.findUnique.mockResolvedValue(fakeDeletedSector);

        const result = await sectorService.deleteSector(fakeDeletedSector.id);

        expect(result).toBeUndefined();
        expect(mockPrisma.sector.delete).toHaveBeenCalled();

        await expect(sectorService.deleteSector("string")).rejects.toThrow();
    });
});

describe('get by name', () => {
    it('deve retornar setor por nome', async () => {
        const fakeSector = {
            id: 1,
            name: "Administrativo"
        }

        mockPrisma.sector.findFirst.mockResolvedValue(fakeSector);

        const result = await sectorService.getByName(fakeSector.name);
        expect(mockPrisma.sector.findFirst).toHaveBeenCalled();
    });
});