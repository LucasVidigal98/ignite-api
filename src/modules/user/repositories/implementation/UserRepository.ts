import { getRepository, Repository } from 'typeorm';

import { User } from '../../entities/User';
import { IUserDTO } from '../DTO/IUserDTO';
import { IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {

  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  
  async findById(id: string): Promise<User | undefined> {
    return await this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.repository.findOne({ where: { email } });
  }

  async list(): Promise<User[]> {
    return await this.repository.find();
  }

  async create({ name, email, password, id, avatar }: IUserDTO): Promise<User> {
    const user = this.repository.create({
       name, 
       email, 
       password,
       avatar,
       id 
    });

    await this.repository.save(user);
    
    return user;
  }
}

export { UserRepository };