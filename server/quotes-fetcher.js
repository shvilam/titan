const fetch = require('node-fetch');
require('dotenv').config();
const { upsetQuotes } = require('./quotes-dal');
const {RateLimiter}  = require('./rate_limiter')
const FETCH_PER_INTERVAL = 30;
const RATE_LIMIT_SLIDING_WINDOW = 20 * 1000
const url = `https://favqs.com/api/quotes`;


const initQuotesFetcher = async () => {
    let pageIndex = 1;
    let hasMorePages = true;
    const rateLimiter = new RateLimiter(FETCH_PER_INTERVAL, RATE_LIMIT_SLIDING_WINDOW); //30 calls in 20 secand
    while(hasMorePages) 
      const res = await rateLimiter.limit(fetchQuotes.bind(null, pageIndex));
      console.log('fetched new page', {page: res.page, numberQuotes: res.quotes.length});
      upsetQuotes(res.quotes); // not wating for inserting qoutes in case that if failed we will lose the data
                               // maybe a Q could have sloved it
      hasMorePages = !res.last_page;
      pageIndex++;
    } 
    console.log('fetch all pages ', pageIndex);
}

const fetchQuotes = async (page) => {
  try {
    const response = await fetch(url+"?page="+page, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token="${process.env.FAVQS_KEY}"`
      }
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
module.exports = {
    initQuotesFetcher
};