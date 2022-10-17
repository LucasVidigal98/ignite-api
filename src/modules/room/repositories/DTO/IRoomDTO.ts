import { User } from "../../../user/infra/typeorm/entities/User";

interface IRoomDTO {
  name: string;
  description: string;
  userAdmin: User;
  users: User;
}

export { IRoomDTO };