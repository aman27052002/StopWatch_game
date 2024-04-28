import React, { useState ,useRef} from 'react'
import ResultModel from './ResultModel'
export default function TimerChallenge({title ,targetTime}) {
    const timer = useRef() 
    const dialog = useRef() 

    const [timeRemaining,setTimeRemaining] = useState(targetTime*1000)
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

    if(timeRemaining <=0){
      clearInterval(timer.current)
      setTimeRemaining(targetTime*1000)
      dialog.current.open()
    }
    function handleReset(){
      setTimeRemaining(targetTime*1000)
    }
    function handleStart(){
       timer.current = setInterval(()=>{
            setTimeRemaining(prevTimeRemaining=>prevTimeRemaining-10)
        },10)
        
    }
    function handleStop(){
      dialog.current.open()
      clearInterval(timer.current)
    }

  return <>
   <ResultModel ref = {dialog}
      targetTime = {targetTime} 
      onReset = {handleReset} 
      remainingTime = {timeRemaining}
   />
   <section className="challenge">
    <h2>{title}</h2>
    {/* {timerExpired && <p>You lost!</p>} */}
    <p className="challenge-time">
      {targetTime} second{targetTime > 1 ? 's':''}
    </p>
    <p>
        <button onClick={timerIsActive ?handleStop:handleStart}>
            {timerIsActive ? "Stop" : "Start"} challenge
        </button>
    </p>
    <p className={timerIsActive ? "active" : ""}>
      {timerIsActive ? 'Time is running...' : 'Time inactive'}
    </p>
  </section>
  </>
}

