/**
 * We need this in order to use @Decorators
 **/
import 'reflect-metadata';

import express from 'express';
import applyLoaders from './loaders';
import config from './config';
import logger from './libs/logger';

const PORT = config.common.port;

export const app = express();

(async function startServer(): Promise<void> {
  /**
   * Hack! Import/Export can only be used in 'top-level code'
   **/
  await applyLoaders(app);
  try {
    app.listen(PORT);
    logger.info(`Server listening on port ${PORT} ☕︎`);
  } catch (error) {
    logger.error(error);
  }
})();
