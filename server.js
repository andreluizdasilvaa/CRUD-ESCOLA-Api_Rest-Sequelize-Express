import app from './app.js';

const PORT = 3001;
app.listen(PORT, () => {
    console.log()
    console.log(`Escutando na porta: ${PORT}`);
    console.log(`CTRL + CLIQUE:  http://localhost:${PORT}`);
}) 