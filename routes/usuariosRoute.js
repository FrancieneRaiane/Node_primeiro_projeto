import express from 'express';
import usuariosController from '../controllers/usuariosController.js';

const router = express.Router();
router.post('/users', usuariosController.criar) //http://localhost/api/users


export default router;
