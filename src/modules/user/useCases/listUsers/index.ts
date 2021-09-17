import { UserRepository } from '../../repositories/implementation/UserRepository';
import { ListUserController } from './ListUsersController';
import { ListUserUseCase } from './ListUserUseCase';

const userRepository = UserRepository.getInstance();
const listUsersUseCase = new ListUserUseCase(userRepository);
const listUsersController = new ListUserController(listUsersUseCase);

export {  listUsersController };