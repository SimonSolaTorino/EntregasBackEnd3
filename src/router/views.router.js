import { Router } from 'express';
import { petDao } from "../dao/pet.dao.js";
import { userDao } from '../dao/user.dao.js';
import { isAuthenticated, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router()
/**
 * @swagger
 * tags:
 *   name: Views
 *   description: API para gestionar vistas
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene la vista principal
 *     tags: [Views]
 *     responses:
 *       200:
 *         description: Vista principal cargada exitosamente
 */
router.get('/', (req, res) => {
    res.render('home', { userId: req.session.userId })
})
/**
 * @swagger
 * /workingOn:
 *   get:
 *     summary: Obtiene la vista de trabajo en progreso
 *     tags: [Views]
 *     responses:
 *       200:
 *         description: Vista de trabajo en progreso cargada exitosamente
 */
router.get('/workingOn', (req, res)=>{
    res.render('working')
})
/**
 * @swagger
 * /login:
 *   get:
 *     summary: Obtiene la vista de inicio de sesión
 *     tags: [Views]
 *     responses:
 *       200:
 *         description: Vista de inicio de sesión cargada exitosamente
 */
router.get('/login', (req, res) => {
    res.render('login')
})
/**
 * @swagger
 * /registerUser:
 *   get:
 *     summary: Obtiene la vista de registro de usuario
 *     tags: [Views]
 *     responses:
 *       200:
 *         description: Vista de registro de usuario cargada exitosamente
 */
router.get('/registerUser', (req, res) => {
    res.render('registerUser')
})
/**
 * @swagger
 * /registerPet:
 *   get:
 *     summary: Obtiene la vista de registro de mascota
 *     tags: [Views]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vista de registro de mascota cargada exitosamente
 */
router.get('/registerPet', isAuthenticated, isAdmin, (req, res) => {
    res.render('registerPet')
})
/**
 * @swagger
 * /about:
 *   get:
 *     summary: Obtiene la vista sobre nosotros
 *     tags: [Views]
 *     responses:
 *       200:
 *         description: Vista "Sobre nosotros" cargada exitosamente
 */
router.get('/about', (req, res) => {
    res.render('us')
})
/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Obtiene la vista de todas las mascotas
 *     tags: [Views]
 *     responses:
 *       200:
 *         description: Vista de mascotas cargada exitosamente
 */
router.get('/pets', async (req, res) => {
    try{
        const pets = await petDao.getAllPets()
        res.render('pets', { pets })
    }catch(error){
        console.log("error al renderizar vista pets")
        console.log(error)
    }
})
/**
 * @swagger
 * /pets/{idPet}/assignOwner:
 *   get:
 *     summary: Obtiene la vista para asignar un dueño a una mascota
 *     tags: [Views]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idPet
 *         in: path
 *         required: true
 *         description: ID de la mascota
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vista de asignación de dueño cargada exitosamente
 *       404:
 *         description: Mascota no encontrada
 *       500:
 *         description: Error al cargar la vista de asignar dueño
 */
router.get('/pets/:idPet/assignOwner', isAuthenticated, isAdmin, async (req, res)=>{
    const { idPet } = req.params
    try{
      const pet = await petDao.getPetById(idPet)
      if(!pet){
        return res.status(404).json({ message: 'Mascota no encontrada' })
      }
      res.render('assignOwner', { pet })
    } catch (error) {
      console.log("Error al renderizar la vista assignOwner")
      res.status(500).json({ message: 'Error al cargar la vista de asignar dueño' });
    }
})
/**
 * @swagger
 * /profile/{email}:
 *   get:
 *     summary: Obtiene la vista del perfil de un usuario
 *     tags: [Views]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         description: Correo electrónico del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vista del perfil de usuario cargada exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al cargar el perfil del usuario
 */
router.get('/profile/:email', isAuthenticated, async (req, res)=>{
    const { email } = req.params;
    try{
        const user = await userDao.getUserByEmail(email)
        const userData = {
            name: user.name,
            email: user.email,
            pets: user.pets
        }
        res.render('profileUser', { user: userData })
    }catch(error){
        console.log("Error al cargar el perfil del usuario")
        console.log(error)
        res.status(500).send('Error al cargar el perfil del usuario')
    }
})

export default router