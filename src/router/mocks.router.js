import { Router } from 'express';
import { generateMockUsers, generateMockPet } from '../utils/mockingData.utils.js';
import { userDao } from '../dao/user.dao.js';
import { petDao } from '../dao/pet.dao.js';

const router = Router()
/**
 * @swagger
 * tags:
 *   name: mocks
 *   description: API para generar datos aleatoreos en cantidad por medio de GUIS de APIS como postman o insomnia
 */

/**

/**
 * @swagger
 * /users/{num}:
 *   get:
 *     summary: Generar una cantidad específica de usuarios mock.
 *     tags: [mocks]
 *     description: Retorna una cantidad de usuarios mock según el número proporcionado en los parámetros.
 *     parameters:
 *       - in: path
 *         name: num
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: El número de usuarios mock a generar.
 *     responses:
 *       200:
 *         description: Lista de usuarios generados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: El parámetro debe ser un número positivo.
 *       500:
 *         description: Error al generar usuarios mock.
 */
router.get('/users/:num', async (req, res)=>{
    const cantidad_de_usuarios = parseInt(req.params.num)
    if(isNaN(cantidad_de_usuarios) || cantidad_de_usuarios <= 0){
        return res.status(400).json({ message: 'El parámetro debe ser un número positivo.' })
    }
    try{
        const users = await generateMockUsers(cantidad_de_usuarios)
        res.status(200).json(users)
    } catch(error){
        console.log("Error en router.get(/users/:num) de mocks.router.js")
        console.log(error)
        res.status(500).json({ message: 'Error al generar usuarios mock.' })
    }
})
/**
 * @swagger
 * /mockingusers:
 *   get:
 *     summary: Generar 50 usuarios mock.
 *     tags: [mocks]
 *     description: Retorna una lista con 50 usuarios mock generados aleatoriamente.
 *     responses:
 *       200:
 *         description: Lista de 50 usuarios generados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error al generar usuarios mock.
 */
router.get('/mockingusers', async (req, res) => {
    try{
        const users = await generateMockUsers(50)
        res.status(200).json(users)
    }catch(error){
        console.log("Error en router.get(/mockingusers) de mocks.router.js")
        console.log(error)
        res.status(500).json({ message: 'Error al generar usuarios mock' })
    }
})
/**
 * @swagger
 * /generateData:
 *   post:
 *     summary: Generar usuarios y mascotas mock y guardarlos en la base de datos.
 *     tags: [mocks]
 *     description: Genera una cantidad especificada de usuarios y mascotas mock, y los inserta en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cant_user:
 *                 type: integer
 *                 minimum: 1
 *                 description: Número de usuarios mock a generar.
 *               cant_pets:
 *                 type: integer
 *                 minimum: 1
 *                 description: Número de mascotas mock a generar.
 *     responses:
 *       201:
 *         description: Datos generados y guardados exitosamente.
 *       400:
 *         description: Debe proporcionar la cantidad de usuarios y mascotas a generar.
 *       500:
 *         description: Error al generar e insertar los datos.
 */
router.post('/generateData', async (req, res)=>{
    const { cant_user, cant_pets } = req.body;
    
    if(!cant_user || !cant_pets){
        return res.status(400).json({ message: 'Debe proporcionar la cantidad de usuarios y mascotas a generar' })
    }
    if(isNaN(cant_user) || cant_user <= 0){
        return res.status(400).json({ message: 'El parámetro debe ser un número positivo.' })
    }
    if(isNaN(cant_pets) || cant_pets <= 0){
        return res.status(400).json({ message: 'El parámetro debe ser un número positivo.' })
    }

    try{
        const mocks_users = await generateMockUsers(cant_user)
        const mocks_pets = await generateMockPet(cant_pets)
        for(let pet of mocks_pets){
            const pet_in_db = await petDao.createPet(pet)
        }
        for(let user of mocks_users){
            const user_in_db = await userDao.createUser(user)
        }
        res.status(201).json({ message: `se crearon ${cant_user} usuarios y ${cant_pets} mascotas generados aleatoreamente y se insertaron correctamente en la DB` })
    } catch (error) {
        console.log("Error en router.post(/generateData) de mocks.router.js")
        console.log(error)
        res.status(500).json({ message: 'Error al generar e insertar los datos' })
    }
})

export default router