import 'express-async-errors'
import express, { Express } from 'express';
import { APP_NAME, NODE_ENV, PORT } from './config/env';
import { middlewareError } from './errors/middleware-error';
import { defaultPath } from './api/bestConversion/modules/writeConversionsInCSV';
import { bestConversionController } from './api/bestConversion/bestConversionController';

/**
* In the initialization of the application, it has a route of delivery of the generated files, 
*  the route of conversion and an error middleware that replaces the standard error handling.
*/

const app: Express = express();

app.use(express.json());

app.use('/files', express.static(defaultPath));

app.get('/conversion', bestConversionController);

app.use(middlewareError);

app.listen(PORT, () => console.log(`${APP_NAME} | ENV: ${NODE_ENV} | PORT: ${PORT}`));

export default app;