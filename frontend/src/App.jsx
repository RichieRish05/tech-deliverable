import "./App.css";
import { useEffect, useState } from "react";
import QuoteDisplay from "./components/quote-display";
import DropdownMenu from "./components/dropdown-menu";

function App() {

	const [quotes, setQuotes] = useState([]);
	const [timePeriod, setTimePeriod] = useState('all');

	useEffect(() => {
		console.log(timePeriod);
		fetch(`/api/getquotes?max_age=${timePeriod}`)
			.then((res) => res.json())
			.then((data) => setQuotes(data))
			.catch((err) => console.log(err));
	}, [timePeriod]);


	const handleFormSubmit = async(e) => {
		e.preventDefault();

		// Get the form data
		const formData = new FormData(e.target);
		const name = formData.get('name');
		const message = formData.get('message');

		// Reset the form
		e.target.reset();


		// Post the new quote to the database
		fetch('/api/quote', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({name, message}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
		

		// Add the new quote to the quotes array so an api call is not needed
		const newQuote = {
			name: name,
			message: message,
			time: new Date().toISOString()
		}
		setQuotes([newQuote, ...quotes]);
	}

	return (
		<div className="App">
			{/* TODO: include an icon for the quote book */}
			<h1>Hack at UCI Tech Deliverable</h1>

			<h2>Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form onSubmit={handleFormSubmit}>
				<label htmlFor="input-name">Name</label>
				<input type="text" name="name" id="input-name" required />
				<label htmlFor="input-message">Quote</label>
				<input type="text" name="message" id="input-message" required />
				<button type="submit">Submit</button>
				<DropdownMenu 
					args={["week", "month", "year", "all"]}
					onSelect={(value) => setTimePeriod(value)}
				/>
			</form>
			<h2>Previous Quotes</h2>
			{/* TODO: Display the actual quotes from the database */}
			<QuoteDisplay quotes={quotes} />
		</div>
	);
}

export default App;
