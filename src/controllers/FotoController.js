import multer from 'multer';
import multerConfig from '../config/multer.js'
import Foto from '../models/Foto.js';
import Aluno from '../models/Aluno.js';
import fs from 'fs/promises'; // adicione isso
import { resolve } from 'path'; // adicione isso

const upload = multer(multerConfig).single('photo');

class FotoController {
    store(req, res) {
        return upload(req, res, async (err) => {
            if(err) {
                return res.status(401).json({
                    errors: [err.code],
                })
            }

            try {
                const { originalname, filename } = req.file;
                const { aluno_id } = req.body;

                // Verifica se o aluno existe
                const aluno = await Aluno.findByPk(Number(aluno_id));

                if (!aluno) {
                    const filePath = resolve('uploads', 'images', filename);
                    try {
                        await fs.unlink(filePath);
                    } catch {
                        // Se não conseguir deletar, apenas ignore
                    }
                    return res.status(400).json({
                        errors: ['Aluno não encontrado.'],
                    });
                }

                const foto = await Foto.create({ originalname, filename, aluno_id })

                return res.json(foto);
            } catch (e) {
                res.status(400).json({
                    errors: e.errors.map(err => {return err.message})
                })
            }
            
        })
    }
}

export default new FotoController();