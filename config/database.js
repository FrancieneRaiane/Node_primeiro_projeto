import mysql from 'mysql2/promise';
import dotnev from 'dotenv'
dotnev.config();

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'teste'
})
try {
    await connection.execute('SELECT 1');
    console.log('Conexão estabelecida!');
   } catch (error) {
    console.error('Erro ao conectar:', error);
   }

   export default connection;
   