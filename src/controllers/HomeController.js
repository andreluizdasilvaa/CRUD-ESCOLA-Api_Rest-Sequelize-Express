import Aluno from "../models/Aluno.js";

class HomeController {
    async index(req, res) {
        const novoAluno = await Aluno.create({
            nome: 'André',
            sobrenome: 'Luiz',
            email: 'andrezitos@gmail.com',
            idade: 17,
            peso: 80,
            altura: 1.8
        });
        res.status(200).json(novoAluno)
    }
}

export default new HomeController;