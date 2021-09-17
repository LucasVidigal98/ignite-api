import { inject, injectable } from 'tsyringe';

import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';


interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({name, email, password}: IRequest): Promise<User>{
    const user = await this.userRepository.create({
      name, 
      email, 
      password
    });

    return user;
  }
}

export { CreateUserUseCase };