import { Router } from 'express';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateUserController } from './controllers/CreateUserController';
import { AutheticateUserController } from './controllers/AuthenticateUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { CreateComplimentController } from './controllers/CreateComplimentController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const autheticateUserController = new AutheticateUserController();
const complimentComplimentController = new CreateComplimentController();

router.post('/users', createUserController.handle);
//Rota TAGS tem de passar pelo middleware ensureAdmin(ser adm)
router.post('/tags', ensureAdmin, createTagController.handle);
//Gera um hash JWT e a senha vem crip ografada.
router.post('/login', autheticateUserController.handle);
router.post('/compliments', complimentComplimentController.handle);

export { router };