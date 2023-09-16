import dotenv from 'dotenv';
import express from 'express';
import db from './config/db/index.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//Config
dotenv.config();
const PORT = process.env.SERVER_PORT;
const server = express();

server.use(cookieParser());
server.use(express.json());
server.use(cors({ origin: 'http://localhost:5173', credentials: true }));
server.use('/api', router);
db.sync({ force: false }).then(() => {
  console.log('ESCUCHANDO A LA DB');
  server.listen(PORT, () => {
    console.log(`listening on port : ${PORT}`);
  });
});
