import DOTEnv from 'dotenv';
import Config from './config.json';
import DBConfig from './db-config.json';
import FS from 'fs';
import Path from 'path';

DOTEnv.config();
const env = process.env.NODE_ENV;

module.exports = {
	env: env,
	port: process.env.PORT,
	config: Config[env],
	dbConfig: DBConfig[env],
	jwtCredentials: {
		publicKey: FS.readFileSync(Path.resolve(__dirname, 'cert', `public.key`), 'utf8')
	}
};