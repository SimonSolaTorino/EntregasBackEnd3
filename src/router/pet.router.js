import { Router } from 'express';
import { petController } from '../controllers/pet.controller.js';
import { isAdmin, isAuthenticated} from '../middlewares/auth.middleware.js';

const router = Router()
/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: API para gestionar mascotas
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra una nueva mascota
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               age:
 *                 type: integer
 *               breed:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mascota registrada exitosamente
 *       403:
 *         description: Acceso denegado
 */
router.post('/register', isAuthenticated, isAdmin, (req, res)=>{petController.createPet(req, res)})
/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene todas las mascotas
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de mascotas
 */
router.get('/', (req, res)=>{petController.getAllPets(req, res)})
/**
 * @swagger
 * /{petId}:
 *   get:
 *     summary: Obtiene una mascota por su ID
 *     tags: [Pets]
 *     parameters:
 *       - name: petId
 *         in: path
 *         required: true
 *         description: ID de la mascota
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mascota encontrada
 *       404:
 *         description: Mascota no encontrada
 */
router.get('/:petId', (req, res)=>{petController.getPetById(req, res)})
/**
 * @swagger
 * /{petId}:
 *   put:
 *     summary: Actualiza una mascota por su ID
 *     tags: [Pets]
 *     parameters:
 *       - name: petId
 *         in: path
 *         required: true
 *         description: ID de la mascota
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               age:
 *                 type: integer
 *               breed:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mascota actualizada exitosamente
 *       404:
 *         description: Mascota no encontrada
 */
router.put('/:petId', (req, res)=>{petController.updatePet(req, res)})
/**
 * @swagger
 * /{petId}:
 *   delete:
 *     summary: Elimina una mascota por su ID
 *     tags: [Pets]
 *     parameters:
 *       - name: petId
 *         in: path
 *         required: true
 *         description: ID de la mascota
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Mascota eliminada exitosamente
 *       404:
 *         description: Mascota no encontrada
 */
router.delete('/:petId', (req, res)=>{petController.deletePet(req, res)})
/**
 * @swagger
 * /{petId}/assignOwner:
 *   post:
 *     summary: Asigna un dueño a una mascota
 *     tags: [Pets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: petId
 *         in: path
 *         required: true
 *         description: ID de la mascota
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ownerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dueño asignado exitosamente
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Mascota no encontrada
 */
router.post('/:petId/assignOwner', isAuthenticated, isAdmin, (req, res)=>{petController.assignOwnerToPet(req, res)})

export default router