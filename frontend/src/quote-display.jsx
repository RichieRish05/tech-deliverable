import { useEffect, useState } from "react";
const QuoteDisplay = ({ quotes }) => {
    return (
    <div>
        <div>
            {quotes.map((quote, index) => (
                <p key={index}>{quote.name}: {quote.message}</p>
            ))}
        </div>
    </div>
    )
}

export default QuoteDisplay;