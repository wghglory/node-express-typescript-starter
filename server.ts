import 'module-alias/register';

import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import authMiddleware from './middlewares/auth.middleware';
import delayMiddleware from './middlewares/delay.middleware';
import { authRouter } from './routes/auth.route';
import { taskRouter } from './routes/task.route';
import { tenantRouter } from './routes/tenant.route';

const app: Application = express();
const apiPrefix = '/cloudapi/1.0.0'; // '/api/v1'

// Body parsing Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(delayMiddleware, authMiddleware);

app.use(`${apiPrefix}/tenants`, tenantRouter);

// vcd task API
app.use(`/api/task`, taskRouter);

// /api/sessions
app.use(`/api`, authRouter);

// RDE routes
app.use(apiPrefix, [
  // DON'T DELETE BELOW COMMENT. It's hygen's insertion point
  // <!--ENTITY_ROUTES-->
  tenantRouter,
]);

// app.get('/', async (req: Request, res: Response): Promise<Response> => {
//   return res.status(200).send({
//     message: 'Hello World!',
//   });
// });

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
