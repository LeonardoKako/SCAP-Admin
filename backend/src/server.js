import express from 'express';
import 'dotenv/config';
import sectorRoutes from './modules/sector/sectorRoutes.js';
import userRoutes from './modules/user/userRoutes.js';
import accessRouter from './modules/access/accessRouter.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(sectorRoutes);
app.use(userRoutes);
app.use(accessRouter);

app.listen(port);