const express = require("express");
const cors = require("cors");
require("dotenv").config({
  path: "./.env",
});

const bitcoinRouter = require("../routes/bitcoin.route");
const ethereumRouter = require("../routes/ethereum.route");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/crypto", [bitcoinRouter, ethereumRouter]);

app.listen(PORT, () => console.log(`Server started successfully at: ${PORT}`));
