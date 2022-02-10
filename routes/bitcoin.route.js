const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

const newspapers = [
  {
    name: "coindesk",
    address: "https://www.coindesk.com/learn",
    baseAddress: "https://www.coindesk.com",
  },
  {
    name: "cryptonews",
    address: "https://cryptonews.com/guides/bitcoin",
    baseAddress: "https://cryptonews.com",
  },
  {
    name: "cointelegraph",
    address: "https://cointelegraph.com/bitcoin-for-beginners",
    baseAddress: "https://cointelegraph.com",
  },
];

const articles = [];

newspapers.forEach((newspaper) => {
  axios
    .get(newspaper.address)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $('a:contains("Bitcoin")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");

        articles.push({
          title,
          url: newspaper.baseAddress + url,
          source: newspaper.name,
        });
      });
    })
    .catch((err) => console.error(err));
});

router.get("/bitcoin-today", (req, res) => {
  res.json(articles);
});

router.get("/bitcoin/:newspaperId", async (req, res) => {
  const newspaperId = req.params.newspaperId;
  const newspaperAddress = newspapers.filter(
    (newspaper) => newspaper.name === newspaperId
  )[0].address;
  const baseAddress = newspapers.filter(
    (newspaper) => newspaper.name === newspaperId
  )[0].baseAddress;

  axios
    .get(newspaperAddress)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const individualArticle = [];

      $('a:contains("Bitcoin")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        individualArticle.push({
          title,
          url,
          source: newspaperId,
        });
      });
      res.json(individualArticle);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
