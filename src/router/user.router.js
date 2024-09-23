import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import { hashPassword } from '../utils/hash.utils.js';

const router = Router()

router.post('/', async (req, res)=>{userController.createUser(req, res)})

router.post('/login', (req, res)=>{userController.loginUser(req, res)})

router.get('/:userId', (req, res)=>{userController.getUserById(req, res)})

router.get('/', (req, res)=>{userController.getAllUsers(req, res)})

router.put('/:userId', (req, res)=>{userController.updateUser(req, res)})

router.delete('/:userId', (req, res)=>{userController.deleteUser(req, res)})

export default router