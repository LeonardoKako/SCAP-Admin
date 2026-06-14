import { describe, it, expect, vi, beforeEach } from 'vitest';
import authService from './authService.js';
import userService from '../user/userService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

vi.mock('../user/userService.js');
vi.mock('bcrypt');
vi.mock('jsonwebtoken');

describe('authService - login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_PASSWORD = 'test_jwt_password';
  });

  it('should throw error if email or password are not strings', async () => {
    await expect(authService.login({ email: 123, password: 'abc' })).rejects.toThrow('Email e senha devem ser strings');
  });

  it('should throw error if email or password are empty', async () => {
    await expect(authService.login({ email: '', password: 'abc' })).rejects.toThrow('Email e senha são obrigatórios');
  });

  it('should throw error if user is not found', async () => {
    userService.getByEmail.mockResolvedValue(null);
    await expect(authService.login({ email: 'nonexistent@test.com', password: 'password' })).rejects.toThrow('Email ou senha inválidos. Tente novamente.');
  });

  it('should throw error if password verification fails', async () => {
    userService.getByEmail.mockResolvedValue({ id: 1, email: 'test@test.com', password: 'hashedpassword' });
    bcrypt.compare.mockResolvedValue(false);
    await expect(authService.login({ email: 'test@test.com', password: 'wrongpassword' })).rejects.toThrow('Email ou senha inválidos. Tente novamente.');
  });

  it('should login successfully and return user and token', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'test@test.com', password: 'hashedpassword' };
    userService.getByEmail.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('mocktoken');

    const result = await authService.login({ email: 'test@test.com', password: 'correctpassword' });

    expect(result).toHaveProperty('token', 'mocktoken');
    expect(result.user).not.toHaveProperty('password');
    expect(result.user.name).toBe('John Doe');
  });
});
