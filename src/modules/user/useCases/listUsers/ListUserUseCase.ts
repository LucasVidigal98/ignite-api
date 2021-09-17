import { User } from '../../model/User';
import { UserRepository } from '../../repositories/implementation/UserRepository';

class ListUserUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(): User[] | undefined{
    const users = this.userRepository.list();

    return users;
  }
}

export { ListUserUseCase };