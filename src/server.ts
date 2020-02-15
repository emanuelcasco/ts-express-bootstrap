/**
 * We need this in order to use @Decorators
 **/
import 'reflect-metadata';

import app from './app';
import config from './config';
import logger from './libs/logger';
import { connectDatabase, checkMigrations } from './db/utils';

const PORT = config.common.port;

(async function startServer(): Promise<void> {
  try {
    const connection = await connectDatabase();
    await checkMigrations(connection);
    app.listen(PORT);
    logger.info(`Server listening on port ${PORT} ☕︎`);
  } catch (error) {
    logger.error(error);
  }
})();
