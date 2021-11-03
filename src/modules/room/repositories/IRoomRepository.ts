import { IRoomDTO } from "./DTO/IRoomDTO";
import { Room } from "../infra/typeorm/entities/Room";

interface IRoomRepository {

  create({ name, description, userAdmin }: IRoomDTO): Promise<Room>;
}

export { IRoomRepository };