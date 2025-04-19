import multer from "multer";
import { extname, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            return cb(null, true);
        }
        return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG.'));
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, resolve(__dirname, '..', '..', 'uploads'))
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
        }
    })
};
