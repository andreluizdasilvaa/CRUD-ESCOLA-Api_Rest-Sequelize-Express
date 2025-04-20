import request from 'supertest';
import app from '../../app.js';
import User from '../models/User.js';

describe('TokenController', () => {
  beforeAll(async () => {
    await User.create({
      nome: 'Token Test',
      email: 'token@jest.com',
      password: '123456'
    });
  });

  it('deve retornar erro se email ou senha não forem enviados', async () => {
    const res = await request(app).post('/tokens').send({});
    expect(res.status).toBe(400);
    expect(res.body.errors).toContain('Email ou Senha não fornecidos.');
  });

  it('deve retornar erro se usuário não existir', async () => {
    const res = await request(app).post('/tokens').send({
      email: 'naoexiste@jest.com',
      password: '123456'
    });
    expect(res.status).toBe(400);
    expect(res.body.errors).toContain('Usuario não existe');
  });

  it('deve retornar erro se senha for inválida', async () => {
    const res = await request(app).post('/tokens').send({
      email: 'token@jest.com',
      password: 'errada'
    });
    expect(res.status).toBe(401);
    expect(res.body.errors).toContain('Senha invalida');
  });

  it('deve retornar token válido', async () => {
    const res = await request(app).post('/tokens').send({
      email: 'token@jest.com',
      password: '123456'
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});