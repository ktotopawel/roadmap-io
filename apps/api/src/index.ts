import type { Express } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRouter from './router';
import serverRoutes from './config/serverRoutes';

dotenv.config();

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

app.use(serverRoutes.api, apiRouter);

app.listen(port, () => {
  //eslint-disable-next-line no-console
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
