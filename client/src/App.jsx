
import React, { useState } from 'react';

import QuotesList from './QuotesList';

function App() {
  const [response, setResponse] = useState([]);
  const [numOfQuotesRequest, setNumOfQuotesRequest] = useState(0);

  const handleAddData = async () => {
    const res = await fetch(`http://localhost:5000/quotes/?num=${numOfQuotesRequest}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    console.log(data.quotes);
    setResponse(data.quotes);
  };

  return (
    <div className='App'>
      <input type='number' data-testid="numOfQuotes" onChange={(e)=> setNumOfQuotesRequest(e.target.value)} />
      <button onClick={handleAddData}>Get Quotes</button>
      <QuotesList quotes={response} />
    </div>
  );
}

export default App;

