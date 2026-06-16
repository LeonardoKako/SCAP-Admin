import { beforeAll, beforeEach, describe, expect, jest } from '@jest/globals';

const userService = {
    listAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    deleteUser: jest.fn()
};

jest.unstable_mockModule('../../../../src/modules/user/userService.js', () => ({
    default: userService
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

let userController;

beforeAll(async () => {
    const module = await import('../../../../src/modules/user/userController.js');
    userController = module.default;
});

beforeEach(() => {
    jest.clearAllMocks();
});


describe('listAll', () => {
    it('deve retornar 200 ao listar usuários', async () => {
        const fakeUsers = [{ id: 1, name: "Caio"}];

        userService.listAll.mockResolvedValue(fakeUsers);

        const req = {};
        const res = mockRes();

        await userController.listAll(req, res, mockNext);

        expect(userService.listAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(fakeUsers);
    });

    it('next deve lançar exceção quando chega do service', async () => {
        const error = new Error("Erro interno");

        userService.listAll.mockRejectedValue(error);

        await userController.listAll({}, mockRes(), mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});

describe('getById', () => {
    it('deve retornar 200 ao listar usuário por id', async () => {
        const fakeUser = { id: 1, name: "Caio" };

        userService.getById.mockResolvedValue(fakeUser);

        const req = { params: { id: 1 } };
        const res = mockRes();

        await userController.getById(req, res, mockNext);

        expect(userService.getById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, data: fakeUser });
    });

    it('next deve lançar exceção quando chega do service', async () => {
        const error = new Error("Erro interno");

        userService.getById.mockRejectedValue(error);

        await userController.getById({ params: { id: 1 } }, mockRes(), mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});

describe('create', () => {
    it('deve retornar 201 ao criar usuário', async () => {
        const fakeUser = { id: 1, name: "Caio" };

        userService.create.mockResolvedValue(fakeUser);

        const req = { body: { name: "Caio" } };
        const res = mockRes();

        await userController.create(req, res, mockNext);

        expect(userService.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: "Usuário Caio cadastrado com sucesso!", 
                                                success: true, 
                                                data: fakeUser 
                                            });
    });

    it('next deve lançar exceção quando chega do service', async () => {
        const error = new Error("Erro interno");

        userService.create.mockRejectedValue(error);

        await userController.create({ body: {name: "Caio"} }, mockRes(), mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});

describe('update', () => {
    it('deve retornar 200 ao atualizar usuário', async () => {
        const fakeUser = { id: 1, name: "Caio" };

        userService.update.mockResolvedValue(fakeUser);

        const req = { body: { name: "João" }, params: { id: 1 } };
        const res = mockRes();

        await userController.update(req, res, mockNext);

        expect(userService.update).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, 
                                                message: "Usuário atualizado com sucesso!",
                                                data: fakeUser 
                                            });
    });

    it('next deve lançar exceção quando chega do service', async () => {
        const error = new Error("Erro interno");

        userService.update.mockRejectedValue(error);

        await userController.update({ body: { name: "João" }, params: { id: 1 } }, mockRes(), mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});

describe('deleteUser', () => {
    it('deve retornar 204 ao deletar usuário', async () => {
        const fakeUser = { id: 1, name: "Caio" };

        userService.deleteUser.mockResolvedValue(fakeUser);

        const req = { params: { id: 1 } };
        const res = mockRes();

        await userController.deleteUser(req, res, mockNext);

        expect(userService.deleteUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.end).toHaveBeenCalled();
    });

    it('next deve lançar exceção quando chega do service', async () => {
        const error = new Error("Erro interno");

        userService.deleteUser.mockRejectedValue(error);

        await userController.deleteUser({ params: { id: 1 } }, mockRes(), mockNext);

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});