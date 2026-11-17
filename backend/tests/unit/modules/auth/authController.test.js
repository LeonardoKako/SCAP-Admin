import { beforeAll, beforeEach, describe, expect, jest } from '@jest/globals';

const mockAuthService = {
    login: jest.fn(),
};

jest.unstable_mockModule('../../../../src/modules/auth/authService.js', () => ({
    default: mockAuthService,
}));

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

let authController;

beforeAll(async () => {
    authController = await import('../../../../src/modules/auth/authController.js');
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe('authController - login', () => {
    it('deve realizar login com sucesso e retornar 200', async () => {
        const req = {
            body: { email: 'admin@scap.com', password: '123' },
        };
        const res = mockRes();
        const fakeResponse = { token: 'token123', user: { name: 'Admin' } };
        mockAuthService.login.mockResolvedValue(fakeResponse);

        await authController.login(req, res, mockNext);

        expect(mockAuthService.login).toHaveBeenCalledWith({ email: 'admin@scap.com', password: '123' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'Login efetuado com sucesso!',
            ...fakeResponse,
        });
    });

    it('deve chamar next com erro se authService falhar', async () => {
        const req = { body: {} };
        const res = mockRes();
        const fakeError = new Error('Falha no login');
        mockAuthService.login.mockRejectedValue(fakeError);

        await authController.login(req, res, mockNext);

        expect(mockNext).toHaveBeenCalledWith(fakeError);
    });
});

describe('authController - me', () => {
    it('deve retornar dados do usuário autenticado no req.user', async () => {
        const req = { user: { id: '1', name: 'Admin' } };
        const res = mockRes();

        await authController.me(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            user: { id: '1', name: 'Admin' },
        });
    });
});
