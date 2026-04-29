import express from 'express';
import 'dotenv/config';
import sectorRoutes from './modules/sector/sectorRoutes.js';
import userRoutes from './modules/user/userRoutes.js';
import accessRouter from './modules/access/accessRouter.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { setupSwagger } from './utils/swagger.js';

const app = express();
const port = 3000;

app.use(express.json());
setupSwagger(app);
app.use(sectorRoutes);
app.use(userRoutes);
app.use(accessRouter);
app.use(errorMiddleware);

app.listen(port);