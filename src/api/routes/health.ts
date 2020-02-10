import { Router } from 'express';

import { healthCheck } from '../controllers/health';

const route = Router();

export default function generateHealthRoutes(app: Router): Router {
  app.use('/health', route);

  route.get('/', healthCheck);
  return app;
}
