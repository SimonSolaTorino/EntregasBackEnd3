import { faker } from '@faker-js/faker';
import { hashPassword } from './hash.utils.js';

export const generateMockUsers = async (cant_user)=>{
    const users = []
    const hashedPassword = await hashPassword('coder123')

    for (let i = 0; i < cant_user; i++) {
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: []
        }
        users.push(user)
    }
    return users
}

export const generateMockPet = async (cant_pets)=>{
    const pets = []
    for (let i = 0; i < cant_pets; i++) {
        const pet = {
            name: faker.animal.type(),
            species: faker.helpers.arrayElement(['Perro', 'Gato', 'Ave', 'Reptil', 'Roedor']),
            age: faker.number.int({ min: 1, max: 15 }),
            photo: faker.image.urlPicsumPhotos(),
            owner: null
        }
        pets.push(pet)
    }

    return pets
}