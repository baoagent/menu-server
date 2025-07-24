
import express, { Express } from 'express';
import cors from 'cors';
import routes from './routes';

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
