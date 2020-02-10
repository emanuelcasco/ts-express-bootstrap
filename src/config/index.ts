import logger from '../libs/logger';
import { deepMerge } from '../utils';
import { ENVIROMENTS } from '../constants';

const ENVIRONMENT = process.env.NODE_ENV || ENVIROMENTS.DEVELOPMENT;

if (ENVIRONMENT !== ENVIROMENTS.PRODUCTION) {
  /**
   * Hack! Import/Export can only be used in 'top-level code'
   **/
  require('dotenv').config(); // eslint-disable-line global-require
}

const configFile = `./${ENVIRONMENT}`;
const environmentConfig = require(configFile).config;

const config = {
  environment: ENVIRONMENT,
  common: {
    port: process.env.PORT || 8080
  },
  database: {
    port: Number(process.env.DB_PORT) || 5432,
    hostname: process.env.DB_HOSTNAME || 'hostname',
    username: process.env.DB_USERNAME || 'username',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database',
    type: 'postgres',
    logging: logger.info
  },
  api: {
    prefix: '/',
    bodySizeLimit: Number(process.env.API_BODY_SIZE_LIMIT) || 1024 * 1024 * 10,
    parameterLimit: Number(process.env.API_PARAMETER_LIMIT) || 10000,
    port: process.env.PORT
  },
  session: {
    header_name: 'authorization',
    secret: process.env.SESSION_SECRET as string
  },
  todosExternalApi: {
    baseUrl: process.env.TODOS_API_BASE_URL
  }
};

const customConfig: typeof config = deepMerge(config, environmentConfig);

export default customConfig;
