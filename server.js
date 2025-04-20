import app from './app.js';
import dotenv from 'dotenv';
dotenv.config();
import appConfig from './src/config/appConfig.js';

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log()
    console.log(`Escutando na porta: ${PORT}`);
    console.log(`CTRL + CLIQUE:  ${appConfig.url}`);
}) 