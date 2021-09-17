import { User } from '../../model/User';
import { IUserDTO } from '../DTO/IUserDTO';
import { IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {

  private users: User[] | undefined;

  private static INSTANCE: UserRepository;

  public static getInstance(): UserRepository {
    if (!UserRepository.INSTANCE) {
      UserRepository.INSTANCE = new UserRepository();
    }

    return UserRepository.INSTANCE;
  }

  constructor() {
    this.users = [];
  }

  list(): User[] | undefined {
    return this.users;
  }

  create({ name, email, password }: IUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password
    });

    this.users.push(user);

    return user;
  }
}

export { UserRepository };