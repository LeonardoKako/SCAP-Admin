import { describe, expect, it, jest } from '@jest/globals';
import { errorMiddleware } from '../../../src/middlewares/errorMiddleware.js';
import { appError } from '../../../src/errors/appError.js';

const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('errorMiddleware', () => {
    it('deve formatar e responder adequadamente erros operacionais (appError)', () => {
        const error = new appError('Recurso não encontrado', 'RESOURCE_NOT_FOUND', 404);
        const req = {};
        const res = mockRes();
        const next = jest.fn();

        errorMiddleware(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: {
                code: 'RESOURCE_NOT_FOUND',
                message: 'Recurso não encontrado',
            },
        });
    });

    it('deve responder status 500 para erros não operacionais', () => {
        const error = new Error('Falha inesperada');
        const req = {};
        const res = mockRes();
        const next = jest.fn();

        errorMiddleware(error, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            error: {
                code: undefined,
                message: 'Falha inesperada',
            },
        });
    });
});
