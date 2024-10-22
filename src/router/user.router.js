import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';

const router = Router()
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos de entrada no válidos
 */
router.post('/register', async (req, res)=>{userController.createUser(req, res)})
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente
 *       401:
 *         description: Credenciales incorrectas
 */
router.post('/login', (req, res)=>{userController.loginUser(req, res)})
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Cierra sesión del usuario
 *     tags: [Users]
 *     responses:
 *       204:
 *         description: Sesión cerrada exitosamente
 */
router.post('/logout', (req, res)=>{ userController.logoutUser(req, res)})
/**
 * @swagger
 * /{userId}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:userId', (req, res)=>{userController.getUserById(req, res)})
/**
 * @swagger
 * /profile/{userEmail}:
 *   get:
 *     summary: Obtiene un usuario por su correo electrónico
 *     tags: [Users]
 *     parameters:
 *       - name: userEmail
 *         in: path
 *         required: true
 *         description: Correo electrónico del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/profile/:userEmail', (req, res)=>{userController.getUserByEmail(req, res)})
/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', (req, res)=>{userController.getAllUsers(req, res)})
/**
 * @swagger
 * /{userId}:
 *   put:
 *     summary: Actualiza un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:userId', (req, res)=>{userController.updateUser(req, res)})
/**
 * @swagger
 * /{userId}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:userId', (req, res)=>{userController.deleteUser(req, res)})

export default router