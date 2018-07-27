import FS from 'fs';
import SocketHelper from '../helpers/socket-helper';
import Path from 'path';

const socketHelper = new SocketHelper();
const routerPath = Path.resolve(__dirname, '');
const basename = Path.basename(module.filename);

FS.readdirSync(routerPath)
	.forEach((file) => {
		if (file !== basename) {
			require(`${routerPath}/${file}`)(socketHelper);
		}
	});

module.exports = socketHelper;