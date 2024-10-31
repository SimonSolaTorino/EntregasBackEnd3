import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../src/app.js';

const { expect } = chai
chai.use(chaiHttp)
/*mocha*/
describe('Mocks Router', () => {
  describe('GET /users/:num', () => {
    it('Debería devolver una lista de usuarios mock de longitud igual al :num del params', (done) => {
      chai.request(app)
        .get('/users/5')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array').that.has.lengthOf(5)
          done()
        })
    })
    it('Debería devolver un error 400 si el :num del params no es un número positivo', (done) => {
      chai.request(app)
        .get('/users/-1')
        .end((err, res) => {
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message').that.equals('El parámetro debe ser un número positivo.')
          done()
        })
    })
  })

  describe('GET /mockingusers', () => {
    it('Debería devolver una lista de 50 usuarios mock', (done) => {
      chai.request(app)
        .get('/mockingusers')
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array').that.has.lengthOf(50)
          done()
        })
    })
  })

  describe('POST /generateData', () => {
    it('Debería generar y guardar en la base de datos usuarios y mascotas mock', (done) => {
      chai.request(app)
        .post('/generateData')
        .send({ cant_user: 3, cant_pets: 2 })
        .end((err, res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('message').that.includes('se crearon 3 usuarios y 2 mascotas')
          done()
        })
    })

    it('Debería devolver un error 400 si faltan los parámetros cant_user o cant_pets', (done) => {
      chai.request(app)
        .post('/generateData')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message').that.equals('Debe proporcionar la cantidad de usuarios y mascotas a generar')
          done()
        })
    })

    it('Debería devolver un error 400 si los parámetros son negativos', (done) => {
      chai.request(app)
        .post('/generateData')
        .send({ cant_user: -1, cant_pets: -1 })
        .end((err, res) => {
          expect(res).to.have.status(400)
          expect(res.body).to.have.property('message').that.equals('El parámetro debe ser un número positivo.')
          done()
        })
    })
  })
})