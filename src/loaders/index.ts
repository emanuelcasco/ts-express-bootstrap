import { Application } from 'express';

import expressLoader from './express';
import typeormLoader from './typeorm';
import loggerLoader from './logger';

export default async function applyLoaders(app: Application): Promise<void> {
  await loggerLoader(app);
  await expressLoader(app);
  await typeormLoader();
}
