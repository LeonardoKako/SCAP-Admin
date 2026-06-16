import { beforeAll, beforeEach, describe, expect, jest } from '@jest/globals';

const sectorService = {
    listAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    deleteSector: jest.fn()
};

jest.unstable_mockModule('../../../../src/modules/sector/sectorService.js', () => ({
    default: sectorService
}));

// helpers para simular req, res, next
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

let sectorController;

beforeAll(async () => {
    const module = await import('../../../../src/modules/sector/sectorController.js');
    sectorController = module.default;
});

beforeEach(() => {
    jest.clearAllMocks();
});


describe('listAll', () => {
    it('deve retornar 200 ao listar setores', async () => {
        const fakeSectors = [{ id: 1, name: "Administrativo"}];

        sectorService.listAll.mockResolvedValue(fakeSectors);

        const req = {};
        const res = mockRes();

        await sectorController.listAll(req, res, mockNext);

        expect(sectorService.listAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakeSectors);
    });

    it('next deve lançar exceção quando chega do service', async () => {
        const error = new Error("Erro interno");

        sectorService.listAll.mockRejectedValue(error);

        await sectorController.listAll({}, mockRes(), mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});

describe('getById', () => {
    it('deve retornar 200 ao listar setor por id', async () => {
        const fakeSector = { id: 1, name: "Administrativo" };

        sectorService.getById.mockResolvedValue(fakeSector);

        const req = { params: { id: 1 } };
        const res = mockRes();

        await sectorController.getById(req, res, mockNext);

        expect(sectorService.getById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: fakeSector });
    });

    it('next deve lançar exceção quando chega do service', async () => {
        const error = new Error("Erro interno");

        sectorService.getById.mockRejectedValue(error);

        await sectorController.getById({ params: { id: 1 } }, mockRes(), mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});

describe('create', () => {
    it('deve retornar 201 ao criar setor', async () => {
        const fakeSector = { id: 1, name: "Administrativo" };

        sectorService.create.mockResolvedValue(fakeSector);

        const req = { body: { name: "Administrativo" } };
        const res = mockRes();

        await sectorController.create(req, res, mockNext);

        expect(sectorService.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: "Setor Administrativo foi criado com sucesso!", 
                                                success: true, 
                                                data: fakeSector 
                                            });
    });

    it('next deve lançar exceção quando chega do service', async () => {
        const error = new Error("Erro interno");

        sectorService.create.mockRejectedValue(error);

        await sectorController.create({ body: { name: "Administrativo" } }, mockRes(), mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});

describe('update', () => {
    it('deve retornar 200 ao atualizar setor', async () => {
        const fakeSector = { id: 1, name: "Administrativo" };

        sectorService.update.mockResolvedValue(fakeSector);

        const req = { body: { name: "Financeiro" }, params: { id: 1 } };
        const res = mockRes();

        await sectorController.update(req, res, mockNext);

        expect(sectorService.update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, 
                                                message: "Setor Financeiro atualizado com sucesso",
                                                data: fakeSector
                                            });
    });

    it('next deve lançar exceção quando chega do service', async () => {
        const error = new Error("Erro interno");

        sectorService.update.mockRejectedValue(error);

        await sectorController.update({ body: { name: "Financeiro" }, params: { id: 1 } }, mockRes(), mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});

describe('deleteSector', () => {
    it('deve retornar 204 ao deletar setor', async () => {
        const fakeSector = { id: 1, name: "Administrativo" };

        sectorService.deleteSector.mockResolvedValue(fakeSector);

        const req = { params: { id: 1 } };
        const res = mockRes();

        await sectorController.deleteSector(req, res, mockNext);

        expect(sectorService.deleteSector).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.end).toHaveBeenCalled();
    });

    it('next deve lançar exceção quando chega do service', async () => {
        const error = new Error("Erro interno");

        sectorService.deleteSector.mockRejectedValue(error);

        await sectorController.deleteSector({ params: { id: 1 } }, mockRes(), mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});