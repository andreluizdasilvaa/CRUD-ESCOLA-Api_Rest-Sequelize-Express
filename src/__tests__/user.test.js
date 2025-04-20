import request from 'supertest';
import app from '../../app.js'; // ajuste se o nome do arquivo principal for diferente
import User from '../models/User.js';

describe('UserController', () => {
  let token;

  beforeAll(async () => {
    await User.destroy({ where: {} }); // Limpa usuários
  });

  it('deve criar um usuário', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        nome: 'Teste',
        email: 'teste@jest.com',
        password: '123456'
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email', 'teste@jest.com');
  });

  it('não deve criar usuário com senha curta', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        nome: 'Teste',
        email: 'teste2@jest.com',
        password: '123'
      });
    expect(res.status).toBe(400);
    expect(res.body.errors).toContain('Senha obrigatória e deve ter pelo menos 6 caracteres.');
  });

  it('deve autenticar e retornar token', async () => {
    const res = await request(app)
      .post('/tokens') // ALTERADO de .get para .post
      .send({
        email: 'teste@jest.com',
        password: '123456'
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('deve atualizar usuário autenticado', async () => {
    const res = await request(app)
      .patch('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Novo Nome', email: 'teste@jest.com' });
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('Novo Nome');
  });

  it('deve deletar usuário autenticado', async () => {
    const res = await request(app)
      .delete('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
  });
});