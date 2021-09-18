import express from 'express';
import "reflect-metadata";

import { userRoutes } from './routes/user.routes';
import { authenticateRoutes } from './routes/authenticate.routes';

import "./database";

import "./shared/container";

const app = express();

app.use(express.json());

app.use('/user', userRoutes);

app.use(authenticateRoutes);

export{ app };