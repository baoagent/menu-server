
import express, { Express } from 'express';
import { appConfig } from './config';
import routes from './routes';

const app: Express = express();

app.use(express.json());
app.use('/api', routes);

app.listen(appConfig.port, () => {
  console.log(`Server is running at http://localhost:${appConfig.port}`);
});
