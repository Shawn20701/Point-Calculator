import './Toggle.css'
import { useState } from "react";

export default function Toggle(){
    const [selectedOption, setSelectedOption] = useState("ITD");
    const handleChange = (e) => setSelectedOption(e.target.value);
    return (
    <div className="toggle-container">
        <label>
            <input type="radio" value="ITD" checked={selectedOption === "ITD"} onChange={handleChange} />
            Into the Deep
        </label>
        <label>
            <input type="radio" value="Cs" checked={selectedOption === "Cs"} onChange={handleChange} />
            Centerstage
        </label>
        <label>
            <input type="radio" value="Prp" checked={selectedOption === "Prp"} onChange={handleChange} />
            Powerplay
        </label>
        </div>
    )
}