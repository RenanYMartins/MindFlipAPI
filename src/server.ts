import express from 'express';
import { ErrorHandler } from './shared/middlewares/ErrorHandler';
import { RouterFactory } from './shared/routes/RouterFactory';
import { AuthController } from './modules/auth/controllers/AuthController';

const app = express();
new RouterFactory();
// const teste = new RouterFactory();
// teste.addControllers(new AuthController());

app.use(express.json());
// app.use(teste.buidRoutes());
app.use(ErrorHandler.handler);

app.listen(process.env.PORT || 3000);
