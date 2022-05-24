import express, {Application, Request, Response} from 'express';

import {router as tenantRouter} from './routes/tenant.route';
import {router as providerRouter} from './routes/provider.route';

const app: Application = express();
const port = 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/tenants', tenantRouter);
app.use('/api/v1/providers', providerRouter);

// app.get('/', async (req: Request, res: Response): Promise<Response> => {
//   return res.status(200).send({
//     message: 'Hello World!',
//   });
// });

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error: ${error.message}`);
}
