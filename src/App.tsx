import { useState } from 'react'
import PomodoroTimer from './components/PomodoroTimer'
import FishContainer from './components/FishContainer'
import './App.css'

function App() {
  const [createNewFish, setCreateNewFish] = useState(false);
  return (
    <>
      <div className="card">
        <PomodoroTimer setCreateNewFish = {setCreateNewFish}/>
        <FishContainer createNewFish = {createNewFish} setCreateNewFish = {setCreateNewFish} />
      </div>
    </>
  )
}

export default App
