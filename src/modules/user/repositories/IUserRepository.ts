import { User } from '../model/User';
import { IUserDTO } from './DTO/IUserDTO';

interface IUserRepository {

  create({name, email, password}: IUserDTO): User;
  list(): User[] | undefined;

}

export {  IUserRepository };