import express from 'express';
import 'dotenv/config';
import sectorRoutes from './modules/sector/sectorRoutes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(sectorRoutes);

app.listen(port);