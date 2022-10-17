import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { Room } from "@modules/room/infra/typeorm/entities/Room";
import { IRoomRepository } from "@modules/room/repositories/IRoomRepository";

interface IRequest {
  name: string;
  description: string;
  id: string;
}

@injectable()
class CreateRoomUseCase {
  constructor(
    @inject("RoomRepository")
    private roomRepository: IRoomRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({ name, description, id }: IRequest): Promise<Room> {
    const userAdmin = await this.userRepository.findById(id);

    if(!userAdmin) {
      throw new Error(`User with id ${id} is not found`);
    }

    const room = await this.roomRepository.create({name, description, userAdmin, users: userAdmin});
    return room;
  }

}

export { CreateRoomUseCase };