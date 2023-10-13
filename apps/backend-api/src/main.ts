import express from 'express';
import cors from 'cors';

import fontsRouter from './fonts';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express();
app.use('/static', cors(), express.static('public'));
app.use('/fonts', fontsRouter);

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] \\  ${host}:${port}`);
});
