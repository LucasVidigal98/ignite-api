import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from '@modules/user/useCases/createUser/CreateUserController';
import { ListUserController } from '@modules/user/useCases/listUsers/ListUsersController';
import { UpdateUserAvatarController } from '@modules/user/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import { ProfileUserController } from '@modules/user/useCases/profileUser/ProfileUserController';

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const listUsersController = new ListUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

userRoutes.post('/', createUserController.handle);
userRoutes.use(ensureAuthenticated);
userRoutes.get('/', listUsersController.handle);
userRoutes.get('/profile', profileUserController.handle);
userRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'), 
  updateUserAvatarController.handle
);

export { userRoutes };