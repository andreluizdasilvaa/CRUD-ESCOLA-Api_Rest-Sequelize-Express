import User from "../models/User.js";

class UserController {
    // Store
    async store(req, res) {
        try {
            const { nome, email, password } = req.body;

            const novoUser = await User.create({
                nome: nome,
                email: email,
                password: password
            });

            if(!novoUser) {
                res.send('Erro no model User');
            }

            return res.status(200).json(novoUser);
        } catch (e) {
            res.status(400).json({
                errors: e.errors.map(err => {return err.message})
            })
        }
    }

    // Index
    async index(req, res) {
        try {
            const users = await User.findAll();
            return res.json(users)
        } catch (e) {
            res.status(400).json({
                errors: e.errors.map(err => {return err.message})
            })
        }
    }

    // Show
    async show(req, res) {
        try {
            if (!req.params) {
                return res.status(400).json({
                    errors: ['ID não fornecido.']
                });
            }

            const user = await User.findByPk(req.params);

            if (!user) {
                return res.status(404).json({
                    errors: ['Usuário não encontrado.']
                });
            }

            return res.status(200).json(user);
        } catch (e) {
            res.status(400).json({
                errors: e.errors.map(err => {return err.message})
            })
        }
    }

    // Update
    async update(req, res) {
        try {
            if(!req.params.id) {
                return res.status(400).json({
                    errors: ['ID não fornecido.']
                })
            }

            const user = await User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).json({
                    errors: ['Usuário não encontrado.']
                });
            }

            const { nome, email } = req.body;

            const novosDados = await user.update({
                nome: nome,
                email: email,
            });

            return res.status(200).json(novosDados);
        } catch (e) {
            res.status(400).json({
                errors: e.errors.map(err => {return err.message})
            })
        }
    }

    // Delete
    async delete(req, res) {
        try {
            if(!req.params.id) {
                return res.status(400).json({
                    errors: ['ID não fornecido.']
                })
            }

            const user = await User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).json({
                    errors: ['Usuário não encontrado.']
                });
            }

            await user.destroy()
            return res.status(200).json(user);
        } catch (e) {
            res.status(400).json({
                errors: e.errors.map(err => {return err.message})
            })
        }
    }
    
}

export default new UserController;