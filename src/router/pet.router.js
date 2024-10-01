import { Router } from 'express';
import { petController } from '../controllers/pet.controller.js';
import { isAdmin, isAuthenticated} from '../middlewares/auth.middleware.js';

const router = Router()

router.post('/register', isAuthenticated, isAdmin, (req, res)=>{petController.createPet(req, res)})

router.get('/', (req, res)=>{petController.getAllPets(req, res)})

router.get('/:petId', (req, res)=>{petController.getPetById(req, res)})

router.put('/:petId', (req, res)=>{petController.updatePet(req, res)})

router.delete('/:petId', (req, res)=>{petController.deletePet(req, res)})

router.post('/:petId/assignOwner', isAuthenticated, isAdmin, (req, res)=>{petController.assignOwnerToPet(req, res)})

export default router