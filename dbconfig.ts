import './loadenv';
import knexfile from './knexfile';
import knex from 'knex';

const env = process.env.NODE_ENV;
const config = env ? knexfile[env] : 'development';
const db = knex(config);
export default db;
