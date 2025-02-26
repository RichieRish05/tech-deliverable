import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();  
};

const QuoteDisplay = ({ quotes }) => {


    return (
    <div className="container mt-5">
        <div className="scrollable-list border rounded p-3">
            <ul className="list-group">
                {quotes.map((quote, index) => (
                    <li className="list-group-item" key={index}>
                        {quote.name}: {quote.message} data: {formatDateTime(quote.time)}
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
}

export default QuoteDisplay;