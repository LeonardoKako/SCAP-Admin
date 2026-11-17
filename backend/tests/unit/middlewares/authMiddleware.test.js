import { beforeAll, beforeEach, describe, expect, jest } from '@jest/globals';
import { appError } from '../../../src/errors/appError.js';

const mockUserService = {
    getById: jest.fn(),
};

const mockJwt = {
    verify: jest.fn(),
};

jest.unstable_mockModule('../../../src/modules/user/userService.js', () => ({
    default: mockUserService,
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
    default: mockJwt,
}));

let authMiddleware;

beforeAll(async () => {
    const module = await import('../../../src/middlewares/authMiddleware.js');
    authMiddleware = module.authMiddleware;
});

beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_PASSWORD = 'secret_test_key';
});

describe('authMiddleware', () => {
    it('deve lançar erro se header authorization não for fornecido', async () => {
        const req = { headers: {} };
        const res = {};
        const next = jest.fn();

        await expect(authMiddleware(req, res, next)).rejects.toThrow('Não autorizado');
    });

    it('deve autenticar com sucesso e anexar req.user sem senha', async () => {
        const req = {
            headers: { authorization: 'Bearer valid_token' },
        };
        const res = {};
        const next = jest.fn();

        mockJwt.verify.mockReturnValue({ id: 'user123' });
        mockUserService.getById.mockResolvedValue({
            id: 'user123',
            name: 'Admin',
            password: 'hashed_password',
        });

        await authMiddleware(req, res, next);

        expect(req.user).toEqual({ id: 'user123', name: 'Admin' });
        expect(req.user).not.toHaveProperty('password');
        expect(next).toHaveBeenCalled();
    });

    it('deve chamar next com appError 401 se usuário não for encontrado', async () => {
        const req = {
            headers: { authorization: 'Bearer valid_token' },
        };
        const res = {};
        const next = jest.fn();

        mockJwt.verify.mockReturnValue({ id: 'user123' });
        const userNotFoundError = new appError('Não encontrado', 'USER_NOT_FOUND', 404);
        mockUserService.getById.mockRejectedValue(userNotFoundError);

        await authMiddleware(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(appError));
    });
});
