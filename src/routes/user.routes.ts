import { Router } from 'express';

import { CreateUserController } from '../modules/user/useCases/createUser/CreateUserController';
import { ListUserController } from '../modules/user/useCases/listUsers//ListUsersController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUserController();

userRoutes.post('/', createUserController.handle);
userRoutes.get('/', listUsersController.handle);

export { userRoutes };