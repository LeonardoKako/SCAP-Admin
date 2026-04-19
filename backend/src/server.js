import express from 'express';
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    return res.send('Teste express');
});

app.listen(port);