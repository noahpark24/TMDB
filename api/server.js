if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const PORT = process.env.SERVER_PORT;
const express = require('express');
const server = express();
const db = require('./config/db/index');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Middlewares
server.use(cookieParser());
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000', credentials: true }));
server.use('/api', router);

//Db config
db.sync({ force: false }).then(() => {
  console.log('ESCUCHANDO A LA DB');
  server.listen(PORT, () => {
    console.log(`listening on port : ${PORT}`);
  });
});
