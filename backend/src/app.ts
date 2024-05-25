import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/routes';

dotenv.config();

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});


export default app;

