import { userModel } from '../models/user.model.js';

class UserDAO {
  async createUser(userData){
    try{
      const newUser = await userModel.create(userData)
      return newUser
    }catch(error){
      console.log("Error en createUser de user.dao.js")
      throw error
    }
  }

  async getUserById(userId) {
    try {
      const user = await userModel.findById(userId)
      return user
    } catch (error) {
        console.log("Error en getUserById de user.dao.js")
        throw error
    }
  }

  async getUserByEmail(email){
    try{
      const user = await userModel.findOne({ email })
      return user
    }catch(error){
        console.log("Error en getUserByEmail de user.dao.js")
        throw error
    }
  }

  async getAllUsers(){
    try{
      const users = await userModel.find()
      return users
    }catch(error) {
        console.log("Error en getAllUsers de user.dao.js")
        throw error
    }
  }

  async updateUser(userId, updateData){
    try{
      const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true })
      return updatedUser
    }catch(error){
        console.log("Error en updateUser de user.dao.js")
        throw error
    }
  }

  async deleteUser(userId){
    try{
      const deletedUser = await userModel.findByIdAndDelete(userId)
      return deletedUser
    }catch(error){
        console.log("Error en updateUser de user.dao.js")
        throw error
    }
  }
}

export const userDao = new UserDAO()