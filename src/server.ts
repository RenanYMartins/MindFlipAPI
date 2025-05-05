import express from 'express';
// import routerV1 from './shared/routes/router-v1.routes';
import { ErrorHandler } from './shared/middlewares/error-handler.middleware';

const app = express();
app.use(express.json());
// app.use(routerV1);
app.use(ErrorHandler.handler);

app.listen(process.env.PORT || 3000);
