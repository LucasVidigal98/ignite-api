import { UserRepository} from "../../repositories/repositoryInMemory/UserRepositoryInMemory";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepository;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepository();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user = { email: 'teste@teste.com', name: 'fulano', password: '1234' }

    const createdUser = await createUserUseCase.execute({ email: user.email, name: user.name, password: user.password });

    expect(createdUser).toHaveProperty('id');
    expect(user.name).toEqual(createdUser.name);
    expect(user.email).toEqual(createdUser.email);
  });
});