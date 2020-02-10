import { Application } from 'express';
import { expressMiddleware, expressRequestIdMiddleware, logger } from 'express-wolox-logger';

import config from '../config';
import { ENVIROMENTS } from '../constants';

export default function loggerLoader(app: Application): Application {
  app.use(expressRequestIdMiddleware());
  if (config.environment !== ENVIROMENTS.TESTING) {
    app.use(expressMiddleware({ loggerFn: logger.info }));
  }
  return app;
}
