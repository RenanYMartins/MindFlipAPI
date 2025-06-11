import express from 'express';
import { ErrorHandler } from './shared/middlewares/ErrorHandler';
import { ApiModule } from './ApiModule';

const app = express();
const apiModule = new ApiModule();

app.use(express.json());
app.use(apiModule.buildRoutes());
app.use(ErrorHandler.handler);

app.listen(process.env.PORT || 3000);
