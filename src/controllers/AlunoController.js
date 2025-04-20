import fs from 'fs/promises';
import { resolve } from 'path';

import Aluno from "../models/Aluno.js";
import Foto from "../models/Foto.js";

class AlunoController {
    async index(req, res) {
        try {
            const alunos = await Aluno.findAll({
                attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
                order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
                include: {
                    model: Foto,
                    attributes: ['url', 'filename']
                }
            });
            res.status(200).json(alunos)
        } catch (e) {
            return res.status(400).json({
                errors: e.errors ? e.errors.map(err => err.message) : [e.message]
            });
        }
    }

    async store(req, res) {
        try {
            const { email } = req.body;
            const userExists = await Aluno.findOne({ where: { email } });

            if (userExists) {
                return res.status(400).json({
                    errors: ['E-mail já cadastrado.']
                });
            }
            
            const novoUser = await Aluno.create(req.body);
            return res.json(novoUser);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors ? e.errors.map(err => err.message) : [e.message]
            });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    errors: ['ID não fornecido.']
                });
            }

            const aluno = await Aluno.findByPk(id, {
                attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
                order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
                include: {
                    model: Foto,
                    attributes: ['url', 'filename']
                }
            });

            if (!aluno) {
                return res.status(400).json({
                    errors: ['Aluno não existe.']
                });
            }

            return res.json(aluno);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors ? e.errors.map(err => err.message) : [e.message]
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    errors: ['ID não fornecido.']
                });
            }

            const aluno = await Aluno.findByPk(id, { attributes: ['id', 'nome', 'email']});

            if (!aluno) {
                return res.status(400).json({
                    errors: ['Aluno não existe.']
                });
            }

            // Busca todas as fotos do aluno
            const fotos = await Foto.findAll({ where: { aluno_id: id } });

            // Remove os arquivos físicos das fotos
            for (const foto of fotos) {
                const filePath = resolve('uploads', 'images', foto.filename);
                try {
                    await fs.unlink(filePath);
                } catch (err) {
                    // Se o arquivo não existir, ignora o erro
                }
            }

            // Remove os registros das fotos do banco
            await Foto.destroy({ where: { aluno_id: id } });

            await aluno.destroy();
            return res.json(aluno);
        } catch (e) {
            res.status(400).json({
                errors: e.errors ? e.errors.map(err => err.message) : [e.message]
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    errors: ['ID não fornecido.']
                });
            }

            const aluno = await Aluno.findByPk(id);

            if (!aluno) {
                return res.status(400).json({
                    errors: ['Aluno não existe.']
                });
            }

            const alunoAtualizado = await aluno.update(req.body);

            return res.json(alunoAtualizado);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors ? e.errors.map(err => err.message) : [e.message]
            });
        }
    }
}

export default new AlunoController;