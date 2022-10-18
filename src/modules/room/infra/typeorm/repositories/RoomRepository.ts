import { getRepository, Repository } from 'typeorm';

import { IRoomDTO } from "../../../repositories/DTO/IRoomDTO";
import { IRoomRepository } from "../../../repositories/IRoomRepository";
import { Room } from "../entities/Room";

class RoomRepository implements IRoomRepository {
  private repository: Repository<Room>;
  
  constructor() {
    this.repository = getRepository(Room);
  }

  async create({ name, description, userAdmin, users }: IRoomDTO): Promise<Room> {
    const room = this.repository.create({
      users: users,
      name,
      description,
      usersAdmin: userAdmin
    });

    await this.repository.save(room);

    return room;
  }

}

export { RoomRepository };