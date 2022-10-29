"use strict";

var _UserRepositoryInMemory = require("../../repositories/repositoryInMemory/UserRepositoryInMemory");
var _CreateUserUseCase = require("./CreateUserUseCase");
let createUserUseCase;
let userRepositoryInMemory;
describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new _UserRepositoryInMemory.UserRepository();
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(userRepositoryInMemory);
  });
  it('should be able to create a new user', async () => {
    const user = {
      email: 'teste@teste.com',
      name: 'fulano',
      password: '1234'
    };
    const createdUser = await createUserUseCase.execute({
      email: user.email,
      name: user.name,
      password: user.password
    });
    expect(createdUser).toHaveProperty('id');
    expect(user.name).toEqual(createdUser.name);
    expect(user.email).toEqual(createdUser.email);
  });
});