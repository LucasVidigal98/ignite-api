import { User } from '../entities/User';
import { IUserDTO } from './DTO/IUserDTO';

interface IUserRepository {

  create({name, email, password, id, avatar}: IUserDTO): Promise<User>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;

}

export { IUserRepository };