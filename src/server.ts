import 'express-async-errors';
import App from './app';
import config from './config/config';

const app = new App();

app.start().listen(config.app.port);
