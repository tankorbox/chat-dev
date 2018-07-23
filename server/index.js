import Express from 'express';
import BodyParser from 'body-parser';
import Path from 'path';
import Helmet from 'helmet';
import FileUpload from 'express-fileupload';
import Cors from 'cors';
import Routers from './routes/index';
import ErrorHandler from './middlewares/error-handler';

const app = Express();


app.use(Helmet())
	.use(Helmet.referrerPolicy({policy: 'same-origin'}))
	.use(BodyParser.urlencoded())
	.use(FileUpload({
		limit: {fileSize: 5 * 1024 * 1024}
	}))
	.use(Cors())
	.use(BodyParser.json())
	.use(BodyParser.urlencoded({extended: true}))
	.use('/api', Routers)
	.use(ErrorHandler)
	.use(Express.static(Path.join(__dirname, '..', 'public', 'views')))
	.set('views', Path.join(__dirname, '..', 'public', 'views'))
	.set('view engine', 'ejs');

module.exports = app;