
import express, { Express } from 'express';
import routes from './routes';

const app: Express = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
