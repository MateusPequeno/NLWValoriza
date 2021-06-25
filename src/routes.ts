import { Router } from 'express';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { AutheticateUserController } from './controllers/AuthenticateUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { ListTagsController } from './controllers/ListTagsController';
import { ListUsersController } from './controllers/ListUsersController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const autheticateUserController = new AutheticateUserController();
const complimentComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiverComplimentsController = new ListUserReceiveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post('/users', createUserController.handle);
//Rota TAGS tem de passar pelo middleware ensureAdmin(ser adm)
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
//Gera um hash JWT e a senha vem crip ografada.
router.post('/login', autheticateUserController.handle);
router.post('/compliments', ensureAuthenticated, complimentComplimentController.handle);

router.get(
  "/users/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);
router.get(
  "/users/compliments/receive",
  ensureAuthenticated,listUserReceiverComplimentsController.handle
);
//Rotas podem ter o mesmo nome contando que os métodos sejam diferentes.
router.get("/tags", listTagsController.handle);
router.get("/users",ensureAuthenticated,listUsersController.handle);

export { router };