import 'bootstrap/dist/css/bootstrap.min.css';

const Quote = ({ quote }) => {

    const formatDateTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return date.toLocaleString();  
    };

    return (
        <div className="quote">
            <h5>{quote.name}</h5>
            <p className="small">{quote.message}</p>
            <p className="small text-muted">{formatDateTime(quote.time)}</p>
        </div>
    )
}

export default Quote;