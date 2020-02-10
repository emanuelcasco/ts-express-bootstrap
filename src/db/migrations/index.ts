import { Connection } from 'typeorm';
import { ENVIROMENTS } from '../../constants';

import logger from '../../libs/logger';
import config from '../../config';

export async function checkMigrations(connection: Connection): Promise<void> {
  const pendingMigrations = await connection.showMigrations();
  if (pendingMigrations) {
    logger.info(`Pending migrations for database "${config.database.database}"`);
    if (config.environment !== ENVIROMENTS.PRODUCTION) {
      throw new Error('Pending migrations, run: npm run migrations');
    }
    return connection
      .runMigrations({ transaction: 'all' })
      .then(() => {
        logger.info('Migrations successfully executed');
      })
      .catch((err: Error) => {
        logger.error(err);
        throw new Error('There are pending migrations that could not be executed');
      });
  }
  logger.info(`Database "${config.database.database}" migrations are up to date`);
  return Promise.resolve();
}
