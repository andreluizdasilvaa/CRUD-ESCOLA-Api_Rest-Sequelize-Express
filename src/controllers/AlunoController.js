import Aluno from "../models/Aluno.js";

class AlunoController {
    async index(req, res) {
        const alunos = await Aluno.findAll();
        res.status(200).json(alunos)
    }

    async store(req, res) {
        try {
            const aluno = await Aluno.create(req.body);

            return res.json(aluno);
        } catch (e) {
            res.status(400).json({
                errors: e.errors.map(err => {return err.message})
            })
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

            const aluno = await Aluno.findByPk(id);

            if (!aluno) {
                return res.status(400).json({
                    errors: ['Aluno não existe.']
                });
            }

            return res.json(aluno);
        } catch (e) {
            res.status(400).json({
                errors: e.errors.map(err => {return err.message})
            })
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

            await aluno.destroy();
            return res.json(aluno);
        } catch (e) {
            res.status(400).json({
                errors: e.errors.map(err => {return err.message})
            })
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