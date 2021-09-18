import { Router } from 'express';

import { CreateUserController } from '../modules/user/useCases/createUser/CreateUserController';
import { ListUserController } from '../modules/user/useCases/listUsers//ListUsersController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const userRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUserController();

userRoutes.use(ensureAuthenticated);
userRoutes.post('/', createUserController.handle);
userRoutes.get('/', listUsersController.handle);

export { userRoutes };