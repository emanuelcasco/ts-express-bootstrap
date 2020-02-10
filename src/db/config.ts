import path from 'path';

import { ConnectionOptions } from 'typeorm';

import config from '../config';

const generatePath = (pathToResolve: string): string => path.join(__dirname, pathToResolve);

const typeOrmConfig = {
  ...config.database,
  entities: [generatePath('./entities/*.{js,ts}')],
  migrations: [generatePath('./migrations/migrations/*.{js,ts}')],
  subscribers: [generatePath('./subscribers/*.{js,ts}')],
  cli: {
    entitiesDir: generatePath('./entities'),
    migrationsDir: generatePath('./migrations/migrations'),
    subscribersDir: generatePath('./subscribers')
  }
} as ConnectionOptions;

export default typeOrmConfig;

module.exports = typeOrmConfig;
