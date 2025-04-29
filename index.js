import express from 'express'
import db from './config/database.js'

import usuariosRoute from './routes/usuariosRoute.js'//

const app = express();

app.use(express.json());//

app.use('/api', usuariosRoute); // http://localhost/api
const PORT = process.env.PORT || 3000;
app.listen (PORT, () => {
    console.log (`Servidor rodando na porta ${PORT}`)
});