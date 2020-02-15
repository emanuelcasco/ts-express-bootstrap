import { createConnection, Connection, ConnectionOptions, DeepPartial } from 'typeorm';

import dbConfig from '../db/config';

export { checkMigrations, MigrationOptions } from '../db/migrations';

export function connectDatabase(options?: DeepPartial<ConnectionOptions>): Promise<Connection> {
  const connectionConfig = { ...options, ...dbConfig } as ConnectionOptions;
  return createConnection(connectionConfig);
}

export function truncateDatabase(connection: Connection): Promise<void> {
  return connection.synchronize(true);
}

export function closeDatabaseConnection(connection: Connection): Promise<void> {
  return connection.close();
}
