"use strict";

var _UserRepositoryInMemory = require("../../../user/repositories/repositoryInMemory/UserRepositoryInMemory");
var _RoomRepository = require("../../repositories/repositoryInMemory/RoomRepository");
var _CreateRoomUseCase = require("./CreateRoomUseCase");
let roomRepository;
let createRoomUseCase;
let userRepositoryInMemory;
describe('#createRoomUseCase', () => {
  beforeEach(async () => {
    roomRepository = new _RoomRepository.RoomRepository();
    userRepositoryInMemory = new _UserRepositoryInMemory.UserRepository();
    await userRepositoryInMemory.create({
      email: 'teste@teste.com',
      name: 'fulano',
      password: '123',
      avatar: '',
      id: '123'
    });
    createRoomUseCase = new _CreateRoomUseCase.CreateRoomUseCase(roomRepository, userRepositoryInMemory);
  });
  it('should create a room', async () => {
    const name = 'Sala 1';
    const description = 'Sala de estudo';
    const room = await createRoomUseCase.execute({
      name,
      description,
      id: '123'
    });
    expect(room).toBeDefined();
    expect(room.name).toEqual('Sala 1');
    expect(room.users).toHaveLength(1);
    expect(room.usersAdmin).toHaveLength(1);
  });
});