const express = require("express");
const cors = require("cors");

const bitcoinRouter = require("../routes/bitcoin.route");
const ethereumRouter = require("../routes/ethereum.route");

const app = express();
const PORT = 5232;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is Crypto News Live API!");
});
app.use("/crypto", [bitcoinRouter, ethereumRouter]);

app.listen(PORT, () => console.log(`Server started successfully at: ${PORT}`));
