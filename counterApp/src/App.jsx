import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleIncrement = ()=> setCount(prev => prev+1);
  const  handleDecrement = ()=> setCount(prev => (prev>0? prev -1:0));
  const handleReset = ()=>{
    setCount(0)
  }

  return (
    <>
      <div className='app'>
        <h1>React Counter</h1>
        <h2>Counter:{count}</h2>
        <div className='buttons'>
          <button onClick={handleIncrement}>+</button>
          <button onClick={handleDecrement}>-</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
    </>
  )
}

export default App
