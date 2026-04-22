import express from 'express';
import 'dotenv/config';
import sectorRoutes from './modules/sector/sectorRoutes.js';
import userRoutes from './modules/user/userRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(sectorRoutes);
app.use(userRoutes);

app.listen(port);