import React from 'react';
import '../PomodoroClock.css';
import './LengthControl.css';

import downArrow from '../control-images/down-arrow.png';
import upArrow from '../control-images/up-arrow.png';


function LengthControl (props) {

  return(
    <div className={props.controlType+"-controls"}>
      <div id={props.controlType+"-label"}>{props.controlType.charAt(0).toUpperCase()+props.controlType.slice(1)} Length</div>
      <img id={props.controlType+"-decrement"}
           value={props.controlType+"-decrement"}
           onClick={props.decrement}
           className="up-down-image"
           src={downArrow}
           alt="arrow pointing down" />
      <div id={props.controlType+"-length"}>{props.time}</div>
      <img id={props.controlType+"-increment"}
           value={props.controlType+"-increment"}
           onClick={props.increment}
           className="up-down-image"
           src={upArrow}
           alt="arrow pointing up"  />
    </div>
  );

}

export default LengthControl;
