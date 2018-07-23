import DOTEnv from 'dotenv';
import Config from './config.json';
import DBConfig from './db-config.json';

DOTEnv.config();
const env = process.env.NODE_ENV;

module.exports = {
	env: env,
	port: process.env.PORT,
	config: Config[env],
	dbConfig: DBConfig[env]
};