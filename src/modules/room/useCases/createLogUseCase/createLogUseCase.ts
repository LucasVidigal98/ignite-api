import { ICreateLogDTO } from "@modules/room/repositories/DTO/ICreateLogDTO";
import { ILogRepository } from "@modules/room/repositories/ILogRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateLogUseCase {
  constructor(
    @inject("LogRepository")
    private logRepository: ILogRepository,
  ) {}

  async execute({ description, user, room }: ICreateLogDTO) {
    await this.logRepository.createLog({ description, room, user });
  }
}

export { CreateLogUseCase };
