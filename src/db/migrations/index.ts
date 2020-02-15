import { Connection } from 'typeorm';

import config from '../../config';
import logger from '../../libs/logger';
import { ENVIROMENTS } from '../../constants';

const DEFAULT_MIGRATION_OPTIONS = { synchronize: false };

export interface MigrationOptions {
  synchronize?: boolean;
}

export async function checkMigrations(
  connection: Connection,
  options: MigrationOptions = DEFAULT_MIGRATION_OPTIONS
): Promise<void> {
  const pendingMigrations = await connection.showMigrations();
  if (pendingMigrations) {
    logger.info(`Pending migrations for database "${config.database.database}"`);
    if (config.environment === ENVIROMENTS.PRODUCTION || options.synchronize) {
      try {
        const migrations = await connection.runMigrations({ transaction: 'all' });
        logger.info(`${migrations.length} migrations were successfully executed`);
        return Promise.resolve();
      } catch (err) {
        logger.error(err);
        throw new Error('There are pending migrations that could not be executed');
      }
    }
    throw new Error('Pending migrations, run: npm run migrations');
  }
  logger.info(`Database "${config.database.database}" migrations are up to date`);
  return Promise.resolve();
}
