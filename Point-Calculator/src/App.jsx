import { useState } from 'react';
import './index.css';
import Pointcalc from './Components/Pointcalc';
import GraphComponent from './Components/graphcomponent';
function App() {
  const [updateGraph, setUpdateGraph] = useState(0);

  const handleScoreUpdate = () => {
      setUpdateGraph(prev => prev + 1); 
  };
  return (
    <>
    <h1 id="title">Point Calculator</h1>
    <Pointcalc onScoreUpdate={handleScoreUpdate}/>
    <GraphComponent key={updateGraph}/>
    
    </>
  )
}

export default App
