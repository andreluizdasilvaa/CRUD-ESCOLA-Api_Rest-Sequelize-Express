import request from 'supertest';
import app from '../../app.js';
import User from '../models/User.js';
import Aluno from '../models/Aluno.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('FotoController', () => {
  let token;
  let alunoId;

  beforeAll(async () => {
    await User.create({
      nome: 'Foto Test',
      email: 'foto@jest.com',
      password: '123456'
    });
    const res = await request(app).post('/tokens').send({
      email: 'foto@jest.com',
      password: '123456'
    });
    token = res.body.token;

    const aluno = await Aluno.create({
      nome: 'Aluno Foto',
      sobrenome: 'Jest',
      email: 'alunofoto@jest.com',
      idade: 22,
      peso: 80,
      altura: 1.80
    });
    alunoId = aluno.id;
  });

  it('deve enviar foto para aluno', async () => {
    const res = await request(app)
      .post('/fotos')
      .set('Authorization', `Bearer ${token}`)
      .attach('photo', path.resolve(__dirname, 'foto.jpg'))
      .field('aluno_id', alunoId);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('filename');
  });

  it('deve retornar erro se aluno não existir', async () => {
    const res = await request(app)
      .post('/fotos')
      .set('Authorization', `Bearer ${token}`)
      .attach('photo', path.resolve(__dirname, 'foto.jpg'))
      .field('aluno_id', 99999);
    expect(res.status).toBe(400);
    expect(res.body.errors).toContain('Aluno não encontrado.');
  });
});