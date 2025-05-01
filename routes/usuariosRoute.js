import express from 'express';
import usuariosController from '../controllers/usuariosController.js';



const router = express.Router();
router.post('/users', usuariosController.criar); //http://localhost/api/users
router.get('/users', usuariosController.listarUsuarios);
router.get('/users/:id', usuariosController.buscarPorId);
router.put('/users/:id', usuariosController.alterarDados);

export default router;
