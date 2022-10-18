import { ICreateLogDTO } from "./DTO/ICreateLogDTO";

interface ILogRepository {
  createLog({ description, room, user }: ICreateLogDTO): Promise<void>;
}

export { ILogRepository };