"use strict";

var _UserRepositoryInMemory = require("../../repositories/repositoryInMemory/UserRepositoryInMemory");
var _CreateUserUseCase = require("../createUser/CreateUserUseCase");
var _authenticateUserCase = require("./authenticateUserCase");
describe('Autheticate User', () => {
  let authenticateUserUseCase;
  let createUserUseCase;
  let userRepositoryInMemory;
  beforeEach(async () => {
    userRepositoryInMemory = new _UserRepositoryInMemory.UserRepository();
    authenticateUserUseCase = new _authenticateUserCase.AuthenticateUserUseCase(userRepositoryInMemory);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(userRepositoryInMemory);
  });
  it('Should be able to create a token', async () => {
    const user = {
      email: 'teste@test.com',
      name: 'Lucas',
      password: '123',
      avatar: '',
      id: ''
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty('token');
  });
  it('should be able to not authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'fakeError',
        password: 'fake'
      });
    }).rejects.toBeInstanceOf(Error);
  });
  it('should be able to not authenticate when password is incorrect', () => {
    expect(async () => {
      const user = {
        email: 'teste@test.com',
        name: 'Lucas',
        password: '123',
        avatar: '',
        id: ''
      };
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'error'
      });
    }).rejects.toBeInstanceOf(Error);
  });
});