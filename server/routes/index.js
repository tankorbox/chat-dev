import Path from 'path';
import FS from 'fs';
import Express from 'express';

const app = Express();
const router = Express.Router();
const routerPath = Path.resolve(__dirname, '');
const basename = Path.basename(module.filename);

FS
	.readdirSync(routerPath)
	.filter(file => {
		return (file !== basename);
	})
	.forEach((file) => {
		require(`${routerPath}/${file}`)(app, router);
	});

module.exports = router;