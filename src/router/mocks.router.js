import { Router } from 'express';
import { generateMockUsers, generateMockPet } from '../utils/mockingData.utils.js';
import { userDao } from '../dao/user.dao.js';
import { petDao } from '../dao/pet.dao.js';

const router = Router()

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