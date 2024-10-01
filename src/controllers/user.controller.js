import { userDao } from '../dao/user.dao.js';
import { hashPassword, comparePasswords } from '../utils/hash.utils.js';

class UserController {
  async createUser(req, res){
    const { name, email, password } = req.body
    try{
      const hashedPassword = await hashPassword(password)
      const newUser = await userDao.createUser({ name, email, password: hashedPassword })
      res.redirect('/login')
    }catch(error){
      console.log("Error en createUser de user.controller.js")
      console.log(error)
      res.status(500).json({ message: 'Error al crear el usuario' })
    }
  }

  async getUserById(req, res){
    const { userId } = req.params
    try{
      console.log(userId)
      const user = await userDao.getUserById(userId)
      if(!user){
        return res.status(404).json({ message: `Usuario con id ${userId} no encontrado` })
      }
      await user.populate('pets')
      res.status(200).json(user)
    }catch(error){
      console.log("Error en getUserById de user.controller.js")
      console.log(error)
      res.status(500).json({ message: 'Error al obtener el usuario' })
    }
  }

  async getUserByEmail(req, res){
    const { userEmail } = req.params
    try{
      const user = await userDao.getUserByEmail(userEmail)
      if(!user){
        return res.status(404).json({ message: `Usuario con email ${userEmail} no encontrado` })
      }
      res.status(200).json(user)
    }catch(error){
      console.log("Error en getUserByEmail de user.controller.js")
      console.log(error)
      res.status(500).json({ message: 'Error al obtener el usuario' })
    }
  }

  async getAllUsers(req, res){
    try{
      const users = await userDao.getAllUsers()
      await users.populate('pets')
      res.status(200).json(users)
    }catch(error){
      console.log("Error en getAllUsers de user.controller.js")
      console.log(error)
      res.status(500).json({ message: 'Error al obtener los usuarios' })
    }
  }

  async updateUser(req, res){
    const { userId } = req.params
    const updateData = req.body
    try{
      const user = await userDao.getUserById(userId)
      if(!user){
        return res.status(404).json({ message: `Usuario con id ${userId} no encontrado` })
      }
      const updatedUser = await userDao.updateUser(userId, updateData)
      res.status(200).json({ message: 'Usuario actualizado con éxito', user: updatedUser })
    }catch(error){
      console.log("Error en updateUser de user.controller.js")
      console.log(error)
      res.status(500).json({ message: 'Error al actualizar el usuario' })
    }
  }

  async deleteUser(req, res){
    const { userId } = req.params

    try{
        const user = await userDao.getUserById(userId)
        if(!user){
            return res.status(404).json({ message: `Usuario con id ${userId} no encontrado` })
        }
        const deletedUser = await userDao.deleteUser(userId)
        res.status(200).json({ message: 'Usuario eliminado con éxito' })
    }catch(error){
      console.log("Error en deleteUser de user.controller.js")
      console.log(error)
      res.status(500).json({ message: 'Error al eliminar el usuario' })
    }
  }

  async loginUser(req, res){
    const { email, password } = req.body
    try{
      const user = await userDao.getUserByEmail(email)
      if(!user){
        return res.status(404).json({ message: `Usuario con email ${email} no encontrado` })
      }
      const isMatch = await comparePasswords(password, user.password)
      if(!isMatch){
        return res.status(401).json({ message: 'Contraseña incorrecta' })
      }
      req.session.userId = user._id
      req.session.userRole = user.role
      req.session.userEmail = user.email
      res.redirect(`/profile/${user.email}`)
    }catch(error){
      console.log("Error en loginUser de user.controller.js")
      console.log(error)
      res.status(500).json({ message: 'Error al iniciar sesión' })
    }
  }

  async logoutUser(req, res){
    try{
      req.session.destroy((err)=>{
        if(err){
          console.log("error al cerrar la sesion.")
          return res.status(500).json({ message: 'Error al cerrar sesión' } )
        }
        res.redirect('/')
      })
    }catch(error){
      console.log("Error en logoutUser de user.controller.js")
      console.log(error)
      res.status(500).json({ message: 'Error al cerrar sesión' })
    }
  }
}

export const userController = new UserController()