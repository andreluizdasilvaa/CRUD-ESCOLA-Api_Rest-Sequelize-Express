import request from 'supertest';
import app from '../../app.js';
import User from '../models/User.js';
import Aluno from '../models/Aluno.js';

describe('AlunoController', () => {
  let token;
  let alunoId;

  beforeAll(async () => {
    await Aluno.destroy({ where: {} });
    await User.destroy({ where: {} });
    await User.create({
      nome: 'Aluno Test',
      email: 'aluno@jest.com',
      password: '123456'
    });
    const res = await request(app).post('/tokens').send({
      email: 'aluno@jest.com',
      password: '123456'
    });
    token = res.body.token;
  });

  it('deve criar um aluno', async () => {
    const res = await request(app)
      .post('/alunos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Aluno',
        sobrenome: 'Jest',
        email: 'aluno1@jest.com',
        idade: 20,
        peso: 70,
        altura: 1.75
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    alunoId = res.body.id;
  });

  it('não deve criar aluno com email já cadastrado', async () => {
    const res = await request(app)
      .post('/alunos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Aluno',
        sobrenome: 'Jest',
        email: 'aluno1@jest.com',
        idade: 20,
        peso: 70,
        altura: 1.75
      });
    expect(res.status).toBe(400);
    expect(res.body.errors).toContain('E-mail já cadastrado.');
  });

  it('deve listar todos os alunos', async () => {
    const res = await request(app)
      .get('/alunos')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve buscar aluno por ID', async () => {
    const res = await request(app)
      .get(`/alunos/${alunoId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', alunoId);
  });

  it('deve atualizar aluno', async () => {
    const res = await request(app)
      .put(`/alunos/${alunoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Aluno Atualizado' });
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('Aluno Atualizado');
  });

  it('deve deletar aluno', async () => {
    const res = await request(app)
      .delete(`/alunos/${alunoId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', alunoId);
  });
});