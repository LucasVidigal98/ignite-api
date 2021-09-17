import { inject, injectable } from 'tsyringe';

import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/implementation/UserRepository';

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