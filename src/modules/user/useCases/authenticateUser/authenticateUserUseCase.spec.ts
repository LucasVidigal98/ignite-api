import { IUserDTO } from "../../repositories/DTO/IUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserCase";

describe('Autheticate User', () => {

  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let userRepositoryInMemory: UserRepositoryInMemory;

  beforeEach(async () => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to create a token', async () => {
    const user: IUserDTO = {
      email: 'teste@test.com',
      name: 'Lucas',
      password: '123',
      avatar: '',
      id: ''
    }

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({ email: user.email, password: user.password });

    expect(result).toHaveProperty('token');
  }); 
  
  it('should be able to not authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({ email: 'fakeError', password: 'fake' });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should be able to not authenticate when password is incorrect', () => {
    expect(async () => {
      const user: IUserDTO = {
        email: 'teste@test.com',
        name: 'Lucas',
        password: '123',
        avatar: '',
        id: ''
      }
  
      await createUserUseCase.execute(user);
  
      await authenticateUserUseCase.execute({ email: user.email, password: 'error' });
    }).rejects.toBeInstanceOf(Error);
  });
});