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

            const { id, nome: userName, email: userEmail } = novoUser;

            return res.status(200).json({ id, nome: userName, email: userEmail });
        } catch (e) {
            res.status(400).json({
                errors: e.errors.map(err => {return err.message})
            })
        }
    }

    // Index
    async index(req, res) {
        try {
            const users = await User.findAll({ attributes: ['id', 'nome', 'email']});
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
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({
                    errors: ['ID não fornecido.']
                });
            }

            const user = await User.findByPk(id, { attributes: ['id', 'nome', 'email']});

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
            const userID = req.userId
            if(!userID) {
                return res.status(400).json({
                    errors: ['ID não fornecido.']
                })
            }

            const user = await User.findByPk(userID);

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

            let userFormatado = {
                id: novosDados.id,
                nome: novosDados.nome,
                email: novosDados.email
            }

            return res.status(200).json(userFormatado);
        } catch (e) {
            res.status(400).json({
                errors: e.errors.map(err => {return err.message})
            })
        }
    }

    // Delete
    async delete(req, res) {
        try {
            const userId = req.userId;
            if(!userId) {
                return res.status(400).json({
                    errors: ['ID não fornecido.']
                })
            }

            const user = await User.findByPk(userId, { attributes: ['id', 'nome', 'email'] });

            if (!user) {
                return res.status(404).json({
                    errors: ['Usuário não encontrado.']
                });
            }

            await user.destroy()
            return res.status(200).json(user, { msg: "Usuario deletado com sucesso."});
        } catch (e) {
            res.status(400).json({
                errors: e.errors.map(err => {return err.message})
            })
        }
    }
    
}

export default new UserController;