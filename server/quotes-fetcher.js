const fetch = require('node-fetch');
require('dotenv').config();
const { upsetQuotes } = require('./quotes-dal');

const FETCH_PER_INTERVAL = 30;
const url = `https://favqs.com/api/quotes`;

const triggerNextFetchInterval = (page) => {
  console.log('timeout for 20s will trigger next fetch interval', {page});  
  setTimeout(()=> {
    handleNextFetch(page, 1);
  }, 20*1000)
}
const initQuotesFetcher = () => {
    handleNextFetch(1, 1);
}

const handleNextFetch = async (page, currentFetch) => {
  let isLastPage = false;
  if (currentFetch < FETCH_PER_INTERVAL) {
    try {
        const res = await fetchQuotes(page);
        console.log('fetch new page', {page: res.page, numberQuotes: res.quotes.length, currentFetch});
        await upsetQuotes(res.quotes);
        isLastPage = res.last_page
        page++;
    } catch (error) {
      console.error(error);
    } finally {
        if (isLastPage === false) {
            handleNextFetch(page, currentFetch + 1);
        } else {
            console.log('LAST PAGE REACHED!!!!');
        }
    }
  } else {
    triggerNextFetchInterval(page);
  }
};
const fetchQuotes = async (page) => {
  try {
    const response = await fetch(url+"?page="+page, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token token="${process.env.FAVQS_KEY}"`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
module.exports = {
    initQuotesFetcher
};