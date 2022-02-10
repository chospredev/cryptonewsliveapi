const express = require("express");
const cors = require("cors");

const bitcoinRouter = require("./routes/bitcoin.route");
const ethereumRouter = require("./routes/ethereum.route");

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.json();
});
app.use("/crypto", [bitcoinRouter, ethereumRouter]);

app.listen(PORT, () => console.log(`Server started successfully at: ${PORT}`));
