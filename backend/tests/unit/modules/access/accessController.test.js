import { beforeAll, beforeEach, describe, expect, jest } from '@jest/globals';

const accessService = {
    listAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
};

jest.unstable_mockModule('../../../../src/modules/access/accessService.js', () => ({
    default: accessService
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

let accessController;

beforeAll(async () => {
    const module = await import('../../../../src/modules/access/accessController.js');
    accessController = module.default;
});

beforeEach(() => {
    jest.clearAllMocks();
});


describe('listAll', () => {
    it('deve retornar 200 ao listar acessos', async () => {
        const fakeAccess = [{ id: 1, userId: 1, accessType: "EXIT"}];

        accessService.listAll.mockResolvedValue(fakeAccess);

        const req = {};
        const res = mockRes();

        await accessController.listAll(req, res, mockNext);

        expect(accessService.listAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakeAccess);
    });

    it('next deve lançar exceção quando chega do service', async () => {
        const error = new Error("Erro interno");

        accessService.listAll.mockRejectedValue(error);

        await accessController.listAll({}, mockRes(), mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});

describe('getById', () => {
    it('deve retornar 200 ao listar acesso por id', async () => {
        const fakeAccess = { id: 1, userId: 1, accessType: "EXIT" };

        accessService.getById.mockResolvedValue(fakeAccess);

        const req = { params: { id: 1 } };
        const res = mockRes();

        await accessController.getById(req, res, mockNext);

        expect(accessService.getById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: fakeAccess });
    });

    it('next deve lançar exceção quando chega do service', async () => {
        const error = new Error("Erro interno");

        accessService.getById.mockRejectedValue(error);

        await accessController.getById({ params: { id: 1 } }, mockRes(), mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});

describe('create', () => {
    it('deve retornar 201 ao registrar acesso', async () => {
        const fakeAccess = { id: 1, userId: 1, accessType: "EXIT" };

        accessService.create.mockResolvedValue(fakeAccess);

        const req = { body: { userId: 1, accessType: "EXIT" } };
        const res = mockRes();

        await accessController.create(req, res, mockNext);

        expect(accessService.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: "O acesso foi registrado com sucesso", 
                                                success: true, 
                                                data: fakeAccess 
                                            });
    });

    it('next deve lançar exceção quando chega do service', async () => {
        const error = new Error("Erro interno");

        accessService.create.mockRejectedValue(error);

        await accessController.create({ body: { userId: 1, accessType: "EXIT" } }, mockRes(), mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});

describe('update', () => {
    it('deve retornar 200 ao atualizar acesso', async () => {
        const fakeAccess = { id: 1, userId: 1, accessType: "EXIT" };

        accessService.update.mockResolvedValue(fakeAccess);

        const req = { body: { userId: 1, accessType: "EXIT" }, params: { id: 1 } };
        const res = mockRes();

        await accessController.update(req, res, mockNext);

        expect(accessService.update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, 
                                                message: "O acesso foi atualizado com sucesso!",
                                                data: fakeAccess
                                            });
    });

    it('next deve lançar exceção quando chega do service', async () => {
        const error = new Error("Erro interno");

        accessService.update.mockRejectedValue(error);

        await accessController.update({ 
            body: { 
                userId: 1, accessType: "EXIT" 
            }, 
            params: { 
                id: 1 
            } 
        }, mockRes(), mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});
