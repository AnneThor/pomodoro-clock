import React from 'react';
import '../PomodoroClock.css';


import start from '../control-images/right-arrow.png';
import pause from '../control-images/pause.png';
import reset from '../control-images/reset.png';
import tenSecondAlarm from '../media/ten-second-alarm.mp3';
import beep from '../media/beep.mp3';


function Timer (props) {


  return(
    <div className={"current-session"}>
      <div id="timer-label">{props.type.charAt(0).toUpperCase()+props.type.slice(1)}</div>
      <div  id="time-left">
        { props.displayTime(props.startTime) }
      </div>
      {props.running ?
      (<img id="start_stop"
            className="start-stop-image"
            src={pause}
            alt="pause"
            value="pause"
            onClick={props.handleTimer} />) :
      (<img id="start_stop"
            className="start-stop-image"
            src={start}
            alt="play"
            value="play"
            onClick={props.handleTimer}/>)
      }
      <img id="reset"
           value="reset"
           onClick={props.reset}
           className="reset-image"
           src={reset}
           alt="reset"  />
      <audio  id="ten-second-alarm"
              src={tenSecondAlarm}
              autoPlay={false}>
        Your browser does not support the <code>audio</code> element.
      </audio>
      <audio id="beep"
             src={beep}
             autoPlay={false}>
             Your browser does not support the <code>audio</code> element.
      </audio>
    </div>


  );

}

export default Timer;
