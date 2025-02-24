import React from 'react';
import './QuotesList.css';
const QuotesList = ({ quotes }) => {
    console.log({ quotes });
    return (
        <div className="quotes-list">
            {quotes && quotes.map((quote) => (
                <div key={quote.id} className="quote-item">
                    <p className="quote-body">"{quote.body}"</p>
                    <p className="quote-author">- {quote.author}</p>
                    <p className="quote-link"><a href={quote.url} target="_blank" rel="noopener noreferrer">Read more</a></p>
                </div>
            ))}
        </div>
    );
};

export default QuotesList;