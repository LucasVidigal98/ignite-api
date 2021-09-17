import { Router } from 'express';

import { createUserController } from '../modules/user/useCases/createUser';
import { listUsersController } from '../modules/user/useCases/listUsers/index';

const userRoutes = Router();

userRoutes.post('/', (req, res) => {
  createUserController.handle(req, res);
});

userRoutes.get('/', (req, res) => {
  listUsersController.handle(req, res);
});

export { userRoutes };