import { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const DropdownMenu = ({ args, onSelect }) => {

    const [selectedOption, setSelectedOption] = useState('week');

    const handleSelect = (arg) => {
        setSelectedOption(arg);
        if (onSelect) {
            onSelect(arg);
        }
    }

    return (
        <div className="dropdown d-inline-block">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {selectedOption}
            </button>
            <ul className="dropdown-menu">
                {args.map((arg, index) => (
                    <li 
                        className="dropdown-item" 
                        key={index}
                        onClick={() => handleSelect(arg)}
                    >
                        {arg}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DropdownMenu;


