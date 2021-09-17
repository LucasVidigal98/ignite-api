import { User } from '../entities/User';
import { IUserDTO } from './DTO/IUserDTO';

interface IUserRepository {

  create({name, email, password}: IUserDTO): Promise<User>;
  list(): Promise<User[]>;

}

export {  IUserRepository };