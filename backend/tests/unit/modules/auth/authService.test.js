import { beforeAll, beforeEach, describe, expect, jest } from '@jest/globals';

const mockUserService = {
  getByEmail: jest.fn(),
};

const mockBcrypt = {
  compare: jest.fn(),
  hash: jest.fn(),
};

const mockJwt = {
  sign: jest.fn(),
};

jest.unstable_mockModule('../../../../src/modules/user/userService.js', () => ({
  default: mockUserService,
}));

jest.unstable_mockModule('bcrypt', () => ({
  default: mockBcrypt,
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: mockJwt,
}));

let authService;

beforeAll(async () => {
  const module = await import('../../../../src/modules/auth/authService.js');
  authService = module.default;
});

describe('authService - login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_PASSWORD = 'test_jwt_password';
  });

  it('should throw error if email or password are not strings', async () => {
    await expect(authService.login({ email: 123, password: 'abc' })).rejects.toThrow('Email e senha devem ser strings');
  });

  it('should throw error if email or password are empty', async () => {
    await expect(authService.login({ email: '', password: 'abc' })).rejects.toThrow('Email e senha são obrigatórios');
  });

  it('should throw error if user is not found', async () => {
    mockUserService.getByEmail.mockResolvedValue(null);
    await expect(authService.login({ email: 'nonexistent@test.com', password: 'password' })).rejects.toThrow('Email ou senha inválidos. Tente novamente.');
  });

  it('should throw error if password verification fails', async () => {
    mockUserService.getByEmail.mockResolvedValue({ id: 1, email: 'test@test.com', password: 'hashedpassword' });
    mockBcrypt.compare.mockResolvedValue(false);
    await expect(authService.login({ email: 'test@test.com', password: 'wrongpassword' })).rejects.toThrow('Email ou senha inválidos. Tente novamente.');
  });

  it('should login successfully and return user and token', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'test@test.com', password: 'hashedpassword' };
    mockUserService.getByEmail.mockResolvedValue(mockUser);
    mockBcrypt.compare.mockResolvedValue(true);
    mockJwt.sign.mockReturnValue('mocktoken');

    const result = await authService.login({ email: 'test@test.com', password: 'correctpassword' });

    expect(result).toHaveProperty('token', 'mocktoken');
    expect(result.user).not.toHaveProperty('password');
    expect(result.user.name).toBe('John Doe');
  });
});
