import Knex from 'knex';
import knexConfig from '../../knexfile';
import { config, NodeEnv } from '../config';

export default Knex(
  config.env === NodeEnv.DEV ? knexConfig['development'] : knexConfig['test']
);
