import "./App.css";
import { useEffect, useState } from "react";
import QuoteDisplay from "./components/quote-display";
import DropdownMenu from "./components/dropdown-menu";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

	const [quotes, setQuotes] = useState([]);
	const [timePeriod, setTimePeriod] = useState('week');

	useEffect(() => {
		fetch(`/api/getquotes?max_age=${timePeriod}`)
			.then((res) => res.json())
			.then((data) => setQuotes(data))
			.catch((err) => console.log(err));
	}, [timePeriod]);


	const handleFormSubmit = async(e) => {
		// Prevent the page from refreshing
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
		<div className="App mx-5">
			{/* TODO: include an icon for the quote book */}
			<div className="text-center">
				<img
					src="/quotebook.png"
					alt="Quote Book"
					className="img-fluid mb-3 mt-4"
					style={{ width: "100px", height: "auto" }} // Adjust width as needed
				/>
			</div>
			<h1 className="text-center mb-3">Hack at UCI Tech Deliverable</h1>

			<h2 className="mb-3">Submit a quote</h2>
			{/* TODO: implement custom form submission logic to not refresh the page */}
			<form onSubmit={handleFormSubmit} className="mb-3">
				<div className="mb-3">
					<label className="form-label" htmlFor="input-name">Name</label>
					<input type="text" name="name" className="form-control w-25" id="input-name" required />
				</div>
				<div className="mb-3">
					<label class Name="form-label" htmlFor="input-message">Quote</label>
					<textarea type="text" name="message" className="form-control w-50" id="input-message" required />
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>

			<h2>Previous Quotes</h2>
			<span className="me-2">Show quotes from the last</span>
			<DropdownMenu 
				args={["day", "week", "month", "year", "all"]}
				onSelect={(value) => setTimePeriod(value)}
				className="mb-3"
			/>

			{/* TODO: Display the actual quotes from the database */}
			<QuoteDisplay quotes={quotes} />




		</div>
	);
}




export default App;

