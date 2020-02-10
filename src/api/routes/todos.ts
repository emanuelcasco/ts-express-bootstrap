import { Router } from 'express';

import * as todosController from '../controllers/todos';
import { authenticate } from '../middlewares/authentication';

const route = Router();

export default function generateUserRoutes(app: Router): Router {
  app.use('/todos', route);

  route.get('/', [authenticate], todosController.findAll);
  route.get('/:id', [authenticate], todosController.findById);

  return app;
}
