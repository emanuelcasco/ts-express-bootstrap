import { createConnection } from 'typeorm';

import dbConfig from '../db/config';
import { checkMigrations } from '../db/migrations';
import logger from '../libs/logger';

export default async function typeormLoader(): Promise<void> {
  const connection = await createConnection(dbConfig);
  await checkMigrations(connection);
  logger.info(`Connected to database "${dbConfig.database}" succesfully!`);
}
