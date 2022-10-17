import { Room } from "../../infra/typeorm/entities/Room";
import { IRoomDTO } from "../DTO/IRoomDTO";
import { IRoomRepository } from "../IRoomRepository";



class RoomRepository implements IRoomRepository {
  private rooms: Room[] = [];

  async create({ name, description, userAdmin }: IRoomDTO): Promise<Room> {
    const room = new Room();
    Object.assign(room, { name, description, usersAdmin: [userAdmin.id], users: [userAdmin.id] });
    this.rooms.push(room);

    return room;
  }
}

export { RoomRepository };