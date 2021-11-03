import { IRoomRepository } from "../../repositories/IRoomRepository";
import { RoomRepository } from "../../repositories/repositoryInMemory/RoomRepository";
import { CreateRoomUseCase } from "./CreateRoomUseCase";

let roomRepository: IRoomRepository;
let createRoomUseCase: CreateRoomUseCase;

describe('#createRoomUseCase', () => {
  beforeEach(() => {
    roomRepository = new RoomRepository();
    createRoomUseCase = new CreateRoomUseCase(roomRepository);
  });

  it('should create a room', () => {
    const name = 'Sala 1'
    const description = 'Sala de estudo'
    const room = createRoomUseCase.execute({name, description});
    expect(room).toBeDefined();
  });
});