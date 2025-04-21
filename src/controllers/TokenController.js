import User from "../models/User.js";
import jwt from 'jsonwebtoken'

class TokenController {
    async store(req, res) {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                errors: ['Email ou Senha não fornecidos.']
            })
        }

        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if(!user) {
            return res.status(400).json({
                errors: ['Usuario não existe']
            })
        }

        if(!(await user.passwordIsValid(password))) {
            return res.status(401).json({
                errors: ["Senha invalida"]
            })
        }

        const { id } = user;

        const token = jwt.sign({ id , email }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });

        res.json({token: token, user: { nome: user.nome, id, email: email}});
    }
}
export default new TokenController;