const express = require("express");
const server = express();
const db = require("./config/db/index");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const cors = require("cors");

server.use(cookieParser());
server.use(express.json());
server.use("/api", router);
server.use(cors());

db.sync({ force: false }).then(() => {
  console.log("ESCUCHANDO A LA DB");
  server.listen(3001, () => {
    console.log(`Servidor escuchando en 3001`);
  });
});
