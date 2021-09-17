import express from 'express';
import "reflect-metadata";

import { userRoutes } from './routes/user.routes';

import "./database";

import "./shared/container";

const app = express();

app.use(express.json());

app.use('/user', userRoutes);

export{ app };