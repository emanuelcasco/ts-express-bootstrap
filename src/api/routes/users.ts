import { Router } from 'express';

import * as usersController from '../controllers/users';

const route = Router();

export default function generateUserRoutes(app: Router): Router {
  app.use('/user', route);

  route.get('/', usersController.findAll);
  route.get('/:id', usersController.findById);
  route.post('/signup', usersController.signup);
  route.post('/login', usersController.login);

  return app;
}
