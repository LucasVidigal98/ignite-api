import { User } from "../../infra/typeorm/entities/User";
import { IUserDTO } from "../DTO/IUserDTO";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
  users: User[] = [];

  async create({ name, email, password, id, avatar }: IUserDTO): Promise<User> {
    const user: User = { name, email, password, id: '123', avatar: '', created_at: new Date(), is_admin: false };

    this.users.push(user);

    return user;
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
}

export { UserRepository };