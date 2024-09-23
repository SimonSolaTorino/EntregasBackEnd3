import { petDao } from '../dao/pet.dao.js';
import { userDao } from '../dao/user.dao.js';
import { petModel } from '../models/pet.model.js';

class PetController {
  async createPet(req, res){
    const { name, species, age, ownerId } = req.body
    try{
      const newPet = await petDao.createPet({ name, species, age, owner: ownerId })
      if(ownerId){
        const owner = await userDao.getUserById(ownerId)
        if(owner){
          owner.pets.push(newPet._id)
          await owner.save()
        }
      }
      res.redirect("/")
    }catch(error){
      console.log("Error en createPet de pet.controller.js")
      console.log(error)
      res.status(500).json({ message: 'Error al crear la mascota' })
    }
  } 

  async getPetById(req, res){
    const { petId } = req.params
    try{
      const pet = await petDao.getPetById(petId)
      if(!pet){
        return res.status(404).json({ message: `Mascota con id ${petId} no encontrada` })
      }
      res.render('profilePet', { pet })
    } catch(error){
      console.log("Error en getPetById de pet.controller.js")
      console.log(error)
      res.status(500).json({ message: 'Error al obtener la mascota' })
    }
  }

  async getAllPets(req, res){
    try{
      const pets = await petDao.getAllPets()
      res.status(200).json(pets)
    } catch(error){
      console.log("Error en getAllPets de pet.controller.js")
      console.log(error)
      res.status(500).json({ message: 'Error al obtener las mascotas' })
    }
  }

  async updatePet(req, res){
    const { petId } = req.params
    const updateData = req.body

    try{
        const pet = await petDao.getPetById(petId)
        if(!pet){
            return res.status(404).json({ message: `Mascota con id ${petId} no encontrada` })
        }
        const updatedPet = await petDao.updatePet(petId, updateData)
        res.status(200).json({ message: 'Mascota actualizada con éxito', pet: updatedPet })
    } catch(error){
      console.log("Error en updatePet de pet.controller.js")
      console.log(error)
      res.status(500).json({ message: 'Error al actualizar la mascota' })
    }
  }

  async deletePet(req, res){
    const { petId } = req.params
    try{
        const pet = await petDao.getPetById(petId)
        if(!pet){
            return res.status(404).json({ message: `Mascota con id ${petId} no encontrada` })
        }
        const deletedPet = await petDao.deletePet(petId)
        res.status(200).json({ message: 'Mascota eliminada con éxito' })
    } catch(error){
      console.log("Error en deletePet de pet.controller.js")
      console.log(error)
      res.status(500).json({ message: 'Error al eliminar la mascota' })
    }
  }

  async assignOwnerToPet(req, res){
    const { petId } = req.params
    const { email } = req.body
    try{
      const owner = await userDao.getUserByEmail(email)
      const pet = await petDao.getPetById(petId)
      if (!owner) {
        return res.status(404).json({ message: `Dueño con mail ${email} no encontrado` })
      }
      if(!pet){
        return res.status(404).json({ message: `Mascota con id ${petId} no encontrada` })
      }
      pet.owner = owner._id

      const updatedPet = await petModel.findByIdAndUpdate(petId,{ owner: owner._id },{ new: true })
      owner.pets.push(updatedPet._id)
      await owner.save()
      res.redirect("/pets")
    }catch(error){
      console.log("Error en assignOwnerToPet de pet.controller.js")
      console.log(error)
      res.status(500).json({ message: 'Error al asignar dueño a la mascota' })
    }
  }

}

export const petController = new PetController()