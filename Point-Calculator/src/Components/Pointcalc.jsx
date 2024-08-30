import { useState } from "react";
import './Pointcalc.css'; 
import Toggle from "./Toggle";
// eslint-disable-next-line react/prop-types
export default function Pointcalc({onScoreUpdate}) {
    const [isChecked, setIsChecked] = useState(false);
    const [setLinesChecked, setSetLinesChecked] = useState(false);
    const [droneChecked, setDroneChecked] = useState(false);
    const [penaltyChecked, setPenaltyChecked] = useState(false);

    const [selectedOption, setSelectedOption] = useState('Neither');
    const [droneValue, setDroneValue] = useState(0);
    const [penaltyValue, setPenaltyValue] = useState('none');
    const [floorPixels, setFloorPixels] = useState(''); 
    const [boardPoints, setBoardPoints] = useState(''); 
    const [mosaicNum, setMosaicNum] = useState('');
    const [setLineNum, setSetLineNum] = useState('');
    const [totalPoints, setTotalPoints] = useState(() => {
        const saveddata = localStorage.getItem('saveddata');
        return saveddata ? JSON.parse(saveddata) : 0;
    })

    const handleclick = () =>{
        localStorage.removeItem('pointsHistory');
       onScoreUpdate();
      }
    const handleCheck = (e) => setIsChecked(e.target.checked);
    const handleSetLineChange = (e) => setSetLinesChecked(e.target.checked);
    const handleDroneChecked = (e) => setDroneChecked(e.target.checked);
    const handlePenaltyChecked = (e) => setPenaltyChecked(e.target.checked);
    const handleRadioChange = (e) => setSelectedOption(e.target.value);
    const handleDroneToggle = (e) => setDroneValue(Number(e.target.value));
    const handlePenaltyToggle = (e) => setPenaltyValue(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        const floorPixelsValue = Number(floorPixels) || 0;
        const boardPixelsValue = Number(boardPoints) * 3 || 0;
        const mosaicValue = Number(mosaicNum) * 10 || 0;
        const setLinesValue = Number(setLineNum) * 10 || 0;

        let hangingOrBackstage = 0;
        if (selectedOption === "Backstage") hangingOrBackstage = 5;
        else if (selectedOption === "Hanging") hangingOrBackstage = 20;

        const dronePoints = Number(droneValue) || 0;
        let penaltyPoints = 0;
        if (penaltyValue === "major") penaltyPoints = 30;
        else if (penaltyValue === "minor") penaltyPoints = 10;

        let totalPoints = floorPixelsValue + boardPixelsValue + mosaicValue + setLinesValue + hangingOrBackstage + dronePoints - penaltyPoints;
        if (totalPoints <= 0 ) setTotalPoints(0);
        else setTotalPoints(totalPoints);

        setFloorPixels('');
        setBoardPoints('');
        setMosaicNum('');
        setSetLineNum('');
    const newEntry = {
        timestamp: new Date().toISOString(),
        totalPoints
    };

    const savedHistory = localStorage.getItem('pointsHistory');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    history.push(newEntry);
    localStorage.setItem('pointsHistory', JSON.stringify(history));

    if (onScoreUpdate) {
        onScoreUpdate(); 
    }
    };

    return (
        <div className='form-container'>
            <h1>Calculate Your Points</h1>
            <Toggle />
            <form onSubmit={handleSubmit} className='point-calc-form'>
                <div className='form-group'>
                    <label htmlFor="Points-on-floor">Pixels On Floor</label>
                    <input id="Points-on-floor" type="number" value={floorPixels} onChange={(e) => setFloorPixels(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label htmlFor="Points-on-board">Pixels On Board</label>
                    <input id="Points-on-board" type="number" value={boardPoints} onChange={(e) => setBoardPoints(e.target.value)} />
                </div>

                <div className='form-group'>
                    <label htmlFor="mosaic-toggle">Mosaics</label>
                    <input id="mosaic-toggle" type="checkbox" checked={isChecked} onChange={handleCheck}/>
                </div>
                {isChecked && (
                    <div className='form-group'>
                        <label htmlFor="mosaic-num">How many Mosaics</label>
                        <input id="mosaic-num" type="number" value={mosaicNum} onChange={(e) => setMosaicNum(e.target.value)} />
                    </div>
                )}

                <div className='form-group'>
                    <label htmlFor="Set-lines-toggle">Set Lines</label>
                    <input id="Set-lines-toggle" type="checkbox" checked={setLinesChecked} onChange={handleSetLineChange}/>
                </div>
                {setLinesChecked && (
                    <div className='form-group'>
                        <label htmlFor="Set-lines">How many Set Lines</label>
                        <input id="Set-lines" type="number" value={setLineNum} onChange={(e) => setSetLineNum(e.target.value)} />
                    </div>
                )}

                <div className='form-group'>
                    <label>Hanging or Backstage</label>
                    <div className='radio-group'>
                        <label>
                            <input type="radio" value="Backstage" checked={selectedOption === "Backstage"} onChange={handleRadioChange} />
                            Backstage
                        </label>
                        <label>
                            <input type="radio" value="Hanging" checked={selectedOption === "Hanging"} onChange={handleRadioChange} />
                            Hanging
                        </label>
                        <label>
                            <input type="radio" value="Neither" checked={selectedOption === "Neither"} onChange={handleRadioChange} />
                            Neither
                        </label>
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor="Drone-toggle">Drone Launched</label>
                    <input id="Drone-toggle" type="checkbox" checked={droneChecked} onChange={handleDroneChecked}/>
                </div>
                {droneChecked && (
                    <div className='form-group'>
                        <div className='radio-group'>
                            <label>
                                <input type="radio" value="30" checked={droneValue === 30} onChange={handleDroneToggle} />
                                30
                            </label>
                            <label>
                                <input type="radio" value="20" checked={droneValue === 20} onChange={handleDroneToggle} />
                                20
                            </label>
                            <label>
                                <input type="radio" value="10" checked={droneValue === 10} onChange={handleDroneToggle} />
                                10
                            </label>
                        </div>
                    </div>
                )}

                <div className='form-group'>
                    <label htmlFor="Penalty-toggle">Penalties</label>
                    <input id="Penalty-toggle" type="checkbox" checked={penaltyChecked} onChange={handlePenaltyChecked}/>
                </div>
                {penaltyChecked && (
                    <div className='form-group'>
                        <div className='radio-group'>
                            <label>
                                <input type="radio" value="major" checked={penaltyValue === "major"} onChange={handlePenaltyToggle} />
                                Major
                            </label>
                            <label>
                                <input type="radio" value="minor" checked={penaltyValue === "minor"} onChange={handlePenaltyToggle} />
                                Minor
                            </label>
                        </div>
                    </div>
                )}
                <div className="button-group">
                    <button type="submit" id='submit'>Calculate Score</button>
                    <button id="cleardata"onClick={handleclick}>Clear All Data</button>
                </div>
            </form>
                <div className='result'>
                    <h2>Score Received:</h2>
                    <h1>{totalPoints}</h1>
                </div>
        </div>
    );
}
