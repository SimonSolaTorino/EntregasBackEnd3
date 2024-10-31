import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../src/app.js';
import { userController } from '../src/app.js/controllers/user.controller.js';

const { expect } = chai
chai.use(chaiHttp)

describe('User Router', () => {
  /*variables stub que simulan los comportamientos de un usuario en el controller*/
  let createUserStub, loginUserStub, logoutUserStub, getUserByIdStub, getUserByEmailStub, getAllUsersStub, updateUserStub, deleteUserStub
  before(() => {
    createUserStub = sinon.stub(userController, 'createUser')
    loginUserStub = sinon.stub(userController, 'loginUser')
    logoutUserStub = sinon.stub(userController, 'logoutUser')
    getUserByIdStub = sinon.stub(userController, 'getUserById')
    getUserByEmailStub = sinon.stub(userController, 'getUserByEmail')
    getAllUsersStub = sinon.stub(userController, 'getAllUsers')
    updateUserStub = sinon.stub(userController, 'updateUser')
    deleteUserStub = sinon.stub(userController, 'deleteUser')
  })
  afterEach(() => {
    sinon.resetHistory()
  })
  after(() => {
    sinon.restore()
  })
  /*mocha*/
  describe('POST /register', () => {
    it('Debería registrar un nuevo usuario con los datos del body', async () => {
      createUserStub.resolves({ status: 201, message: 'Usuario registrado exitosamente' })
      const res = await chai.request(app).post('/register').send({
        username: 'testuser',
        email: 'test@example.com',
        password: '123456',
      })
      expect(res).to.have.status(201)
      expect(res.body.message).to.equal('Usuario registrado exitosamente')
      expect(createUserStub.calledOnce).to.be.true
    })
  })

  describe('POST /login', () => {
    it('Debería logear al usuario autonticado con los datos del body', async () => {
      loginUserStub.resolves({ status: 200, message: 'Usuario autenticado exitosamente' })
      const res = await chai.request(app).post('/login').send({
        email: 'test@example.com',
        password: '123456',
      })
      expect(res).to.have.status(200)
      expect(res.body.message).to.equal('Usuario autenticado exitosamente')
      expect(loginUserStub.calledOnce).to.be.true
    })
  })

  describe('POST /logout', () => {
    it('Debería cerrar la sesion del usuario', async () => {
      logoutUserStub.resolves({ status: 204 })
      const res = await chai.request(app).post('/logout')
      expect(res).to.have.status(204)
      expect(logoutUserStub.calledOnce).to.be.true
    })
  })

  describe('GET /:userId', () => {
    it('Debería traer un usuario de la DB por el params :userId', async () => {
      getUserByIdStub.resolves({ status: 200, user: { id: '123', username: 'testuser' } })
      const res = await chai.request(app).get('/123')
      expect(res).to.have.status(200)
      expect(res.body.user).to.deep.equal({ id: '123', username: 'testuser' })
      expect(getUserByIdStub.calledOnce).to.be.true
    })
  })

  describe('GET /profile/:userEmail', () => {
    it('Debería traer un usuario de la DB por el params :userEmail', async () => {
      getUserByEmailStub.resolves({ status: 200, user: { email: 'test@example.com', username: 'testuser' } })
      const res = await chai.request(app).get('/profile/test@example.com')
      expect(res).to.have.status(200)
      expect(res.body.user).to.deep.equal({ email: 'test@example.com', username: 'testuser' })
      expect(getUserByEmailStub.calledOnce).to.be.true
    })
  })

  describe('GET /', () => {
    it('Debería traer un array con todos los usuarios de la DB', async () => {
      getAllUsersStub.resolves({ status: 200, users: [{ id: '123', username: 'testuser' }] })
      const res = await chai.request(app).get('/')
      expect(res).to.have.status(200)
      expect(res.body.users).to.be.an('array')
      expect(res.body.users[0]).to.deep.equal({ id: '123', username: 'testuser' })
      expect(getAllUsersStub.calledOnce).to.be.true
    })
  })

  describe('PUT /:userId', () => {
    it('Debería actualizar campos de un usuario traido de la DB con el params :userId', async () => {
      updateUserStub.resolves({ status: 200, message: 'Usuario actualizado exitosamente' })
      const res = await chai.request(app).put('/123').send({
        username: 'updateduser',
        email: 'updated@example.com',
      })
      expect(res).to.have.status(200)
      expect(res.body.message).to.equal('Usuario actualizado exitosamente')
      expect(updateUserStub.calledOnce).to.be.true
    })
  })

  describe('DELETE /:userId', () => {
    it('Debería borrar un usuario de la DB con el params :userID', async () => {
      deleteUserStub.resolves({ status: 204 })
      const res = await chai.request(app).delete('/123')
      expect(res).to.have.status(204)
      expect(deleteUserStub.calledOnce).to.be.true
    })
  })
})