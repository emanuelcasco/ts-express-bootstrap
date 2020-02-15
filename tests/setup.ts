import { Connection } from 'typeorm';

import { connectDatabase, truncateDatabase, closeDatabaseConnection } from '../src/db/utils';

let connection: Connection;

beforeAll(async (done: jest.DoneCallback) => {
  connection = await connectDatabase();
  done();
});

beforeEach(() => truncateDatabase(connection));

afterAll(() => closeDatabaseConnection(connection));
