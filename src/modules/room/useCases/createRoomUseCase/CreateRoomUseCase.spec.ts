import { UserRepositoryInMemory } from "../../../user/repositories/in-memory/UserRepositoryInMemory";
import { IRoomRepository } from "../../repositories/IRoomRepository";
import { RoomRepository } from "../../repositories/repositoryInMemory/RoomRepository";
import { CreateRoomUseCase } from "./CreateRoomUseCase";

let roomRepository: IRoomRepository;
let createRoomUseCase: CreateRoomUseCase;

let userRepositoryInMemory: UserRepositoryInMemory;

describe('#createRoomUseCase', () => {
  beforeEach(async () => {
    roomRepository = new RoomRepository();
    userRepositoryInMemory = new UserRepositoryInMemory();
    
    await userRepositoryInMemory.create({ email: 'teste@teste.com', name: 'fulano', password: '123', avatar: '', id: '123' })

    createRoomUseCase = new CreateRoomUseCase(roomRepository, userRepositoryInMemory);
  });

  it('should create a room', async () => {
    const name = 'Sala 1'
    const description = 'Sala de estudo'
    const room = await createRoomUseCase.execute({name, description, id: '123'});

    expect(room).toBeDefined();
    expect(room.name).toEqual('Sala 1');
    expect(room.users).toHaveLength(1);
    expect(room.usersAdmin).toHaveLength(1);
  });
});