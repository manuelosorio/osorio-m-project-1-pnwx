import 'module-alias/register';
import 'dotenv/config';
import express from 'express';
import session, { SessionOptions } from 'express-session';
import cors from 'cors';
import fontsRouter from './fonts';
import { apiRouter } from '@api/api-index';
import * as process from 'process';
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = express();

app.use('/static', cors(), express.static('public'));
app.use('/fonts', fontsRouter);
const sess: SessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  name: 'sid',
  store: new session.MemoryStore(),
  rolling: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    sameSite: true,
    secure: false,
  },
};

app.use(session(sess));

app.use(
  '/api/v:version',
  cors(),
  express.json(),
  express.urlencoded({ extended: true }),
  apiRouter
);
app.use(
  '/api',
  cors(),
  express.json(),
  express.urlencoded({ extended: true }),
  apiRouter
);
app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] \\  ${host}:${port}`);
});
