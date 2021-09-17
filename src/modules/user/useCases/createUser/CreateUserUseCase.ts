import { User } from '../../model/User';
import { IUserRepository } from '../../repositories/IUserRepository';


interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  execute({name, email, password}: IRequest): User{
    const user = this.userRepository.create({name, email, password});

    return user;
  }
}

export { CreateUserUseCase };