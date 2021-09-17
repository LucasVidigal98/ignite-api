import { getRepository, Repository } from 'typeorm';

import { User } from '../../entities/User';
import { IUserDTO } from '../DTO/IUserDTO';
import { IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {

  private repository: Repository<User>;

  private static INSTANCE: UserRepository;

  public static getInstance(): UserRepository {
    if (!UserRepository.INSTANCE) {
      UserRepository.INSTANCE = new UserRepository();
    }

    return UserRepository.INSTANCE;
  }

  constructor() {
    this.repository = getRepository(User);
  }

  async list(): Promise<User[]> {
    return await this.repository.find();
  }

  async create({ name, email, password }: IUserDTO): Promise<User> {
    const user = this.repository.create({
       name, 
       email, 
       password 
    });

    await this.repository.save(user);
    
    return user;
  }
}

export { UserRepository };