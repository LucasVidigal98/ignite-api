import { inject, injectable } from 'tsyringe';

import { User } from '@modules/user/infra/typeorm/entities/User';
import { UserRepository } from '@modules/user/infra/typeorm/repositories/UserRepository';

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