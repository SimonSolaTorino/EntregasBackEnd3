import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../src/app.js';
import { petController } from '../src/controllers/pet.controller.js';
import sinon from 'sinon';

const { expect } = chai
chai.use(chaiHttp)

describe('Pet Routes', () => {
  /*como mocks pero mejor porque yo le genero los datos*/
  before(() => {
    sinon.stub(petController, 'createPet').resolves({ message: 'Mascota registrada exitosamente' })
    sinon.stub(petController, 'getAllPets').resolves([])
    sinon.stub(petController, 'getPetById').resolves({ name: 'Cleto', species: 'Perro' })
    sinon.stub(petController, 'updatePet').resolves({ message: 'Mascota actualizada exitosamente' })
    sinon.stub(petController, 'deletePet').resolves({ message: 'Mascota eliminada exitosamente' })
    sinon.stub(petController, 'assignOwnerToPet').resolves({ message: 'Dueño asignado exitosamente' })
  })
  after(() => {
    sinon.restore()
  })
  /*mocha*/
  describe('POST /register', () => {
    it('Debería registrar una mascota nueva con la data del body', (done) => {
      chai.request(app)
        .post('/register')
        .set('Authorization', 'Bearer token')
        .send({ name: 'Cleto', species: 'Perro', age: 3})
        .end((err, res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('message', 'Mascota registrada exitosamente')
          done()
        })
    })
  })

  describe('GET /', () => {
    it('Debería traer un array con todas las mascotas registradas en la DB', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')
          done()
        })
    })
  })
  
  describe('GET /:petId', () => {
    it('Debería traer una mascota de la DB buscada por el params :petId', (done) => {
      chai.request(app)
        .get('/12345')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('name', 'Cleto')
          expect(res.body).to.have.property('species', 'Perro')
          done()
        })
    })
  })

  describe('PUT /:petId', () => {
    it('Debería actualizar los datos de una mascota de la DB buscada por el params :petId', (done) => {
      chai.request(app)
        .put('/12345')
        .send({ name: 'Cleto', species: 'Perro', age: 4})
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('message', 'Mascota actualizada exitosamente')
          done()
        })
    })
  })

  describe('DELETE /:petId', () => {
    it('Debería borrar una mascota de la DB buscada por el params :petId', (done) => {
      chai.request(app)
        .delete('/12345')
        .end((err, res) => {
          expect(res).to.have.status(204)
          done()
        })
    })
  })

  describe('POST /:petId/assignOwner', () => {
    it('Debería asignarle un dueño a la mascota buscada en la DB por el params :petId', (done) => {
      chai.request(app)
        .post('/12345/assignOwner')
        .set('Authorization', 'Bearer token')
        .send({ ownerId: '67890' })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('message', 'Dueño asignado exitosamente')
          done()
        })
    })
  })
})