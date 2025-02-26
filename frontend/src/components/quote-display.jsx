import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Quote from "./quote";


const QuoteDisplay = ({ quotes }) => {


    return (
    <div className="container mt-5">
        <div className="scrollable-list overflow-auto border rounded p-3" style={{ height: '500px' }}>
            <ul className="list-group">
                {quotes.map((quote, index) => (
                    <li className="list-group-item" key={index}>
                        <Quote quote={quote} />
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
}

export default QuoteDisplay;