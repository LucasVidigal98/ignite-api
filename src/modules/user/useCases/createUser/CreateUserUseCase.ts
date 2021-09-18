import { inject, injectable } from 'tsyringe';
import { hash } from  'bcrypt';

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
    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name, 
      email, 
      password: hashedPassword
    });

    return user;
  }
}

export { CreateUserUseCase };