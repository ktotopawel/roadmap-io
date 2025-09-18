// import type {} from './types/express/express';
import type { Express } from 'express';
import express from 'express';
import cors from 'cors';
import apiRouter from './router';
import serverRoutes from './config/serverRoutes';
import cookieParser from 'cookie-parser';
import DotenvFlow from 'dotenv-flow';

DotenvFlow.config({
  path: __dirname + '/../',
  node_env: process.env.NODE_ENV,
  default_node_env: 'development',
  debug: process.env.NODE_ENV === 'development',
});

const app: Express = express();
const port = process.env.PORT || '3000';

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(serverRoutes.api, apiRouter);

app.listen(port, () => {
  //eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
