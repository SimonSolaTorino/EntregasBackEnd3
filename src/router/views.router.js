import { Router } from 'express';
import { petDao } from "../dao/pet.dao.js";
import { userDao } from '../dao/user.dao.js';

const router = Router()

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/registerUser', (req, res) => {
    res.render('registerUser')
})

router.get('/registerPet', (req, res) => {
    res.render('registerPet')
})

router.get('/about', (req, res) => {
    res.render('us')
})

router.get('/pets', async (req, res) => {
    try{
        const pets = await petDao.getAllPets()
        res.render('pets', { pets })
    }catch(error){
        console.log("error al renderizar vista pets")
        console.log(error)
    }
})


router.get('/pets/:idPet/assignOwner', async (req, res)=>{
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

router.get('/profile/:id', async (req, res)=>{
    const { id } = req.params;
    try{
        const user = await userDao.getUserById(id)
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