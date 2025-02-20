
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { initQuotesFetcher } = require('./quotes-fetcher');
const {listQuotes} = require('./quotes-dal.js');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/quotes', async(req, res) => {
  const numOfQuotes = req.query.num || 10; 
  const quotes = await listQuotes(numOfQuotes);
  res.json({quotes})
});

app.listen(port, () => {
  console.log(port);
  initQuotesFetcher();
});


