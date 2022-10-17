import { Router } from 'express';

import { CreateRoomController} from '@modules/room/useCases/createRoomUseCase/CreateRoomController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const roomRoutes = Router();

const createRoomController = new CreateRoomController();

roomRoutes.use(ensureAuthenticated);
roomRoutes.post('/', createRoomController.handle);

export { roomRoutes };