import { inject, injectable } from 'tsyringe';

import { User } from '../../infra/typeorm/entities/User';
import { UserRepository } from '../../infra/typeorm/repositories/UserRepository';

@injectable()
class ListUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async execute(): Promise<User[]>{
    const users = await this.userRepository.list();

    return users;
  }
}

export { ListUserUseCase };