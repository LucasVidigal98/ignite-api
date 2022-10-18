import { Room } from "@modules/room/infra/typeorm/entities/Room";
import { User } from "@modules/user/infra/typeorm/entities/User";

export interface ICreateLogDTO {
  description: string;
  user: string;
  room: Room;
}