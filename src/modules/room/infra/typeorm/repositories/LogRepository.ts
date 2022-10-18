import { ICreateLogDTO } from '@modules/room/repositories/DTO/ICreateLogDTO';
import { ILogRepository } from '@modules/room/repositories/ILogRepository';
import { getRepository, Repository } from 'typeorm';
import { Log } from '../entities/Log';

class LogRepository implements ILogRepository {
  
  private repository: Repository<Log>;

  constructor() {
    this.repository = getRepository(Log);
  }

  async createLog({ description, room, user }: ICreateLogDTO): Promise<void> {
    const log = this.repository.create({description, room, user});

    await this.repository.save(log);
  }
}

export { LogRepository };