import { petModel } from '../models/pet.model.js';

class PetDAO {
  async createPet(petData){
    try{
      const newPet = await petModel.create(petData)
      return newPet
    }catch(error){
      console.log("Error en createPet de pet.dao.js")
      throw error
    }
  }

  async getPetById(petId){
    try{
      const pet = await petModel.findById(petId).populate('owner')
      return pet
    }catch(error){
      console.log("Error en getPetById de pet.dao.js")
      throw error
    }
  }

  async getAllPets(){
    try{
      const pets = await petModel.find().populate('owner')
      return pets
    }catch(error){
      console.log("Error en getAllPets de pet.dao.js")
      throw error
    }
  }

  async updatePet(petId, updateData){
    try{
      const updatedPet = await petModel.findByIdAndUpdate(petId, updateData, { new: true })
      return updatedPet
    }catch(error){
      console.log("Error en updatePet de pet.dao.js")
      throw error
    }
  }

  async deletePet(petId){
    try{
      const deletedPet = await petModel.findByIdAndDelete(petId)
      return deletedPet
    }catch(error){
      console.log("Error en deletePet de pet.dao.js")
      throw error
    }
  }
}

export const petDao = new PetDAO()
