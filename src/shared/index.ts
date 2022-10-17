import express from 'express';
import "reflect-metadata";

import { userRoutes } from '@shared/infra/http/routes/user.routes';
import { authenticateRoutes } from '@shared/infra/http/routes/authenticate.routes';
import { roomRoutes } from '@shared/infra/http/routes/room.routes';

import "./typeorm";

import "./container";

const app = express();

app.use(express.json());

app.use('/user', userRoutes);

app.use(authenticateRoutes);

app.use('/room', roomRoutes);

export{ app };