import React from 'react';
import './PomodoroClock.css';
import downArrow from './control-images/down-arrow.png';
import upArrow from './control-images/up-arrow.png';
import start from './control-images/right-arrow.png';
import pause from './control-images/pause.png';
import reset from './control-images/reset.png';

class PomodoroClock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentStatus: 'Session',
      breakLength: 5*60,
      sessionLength: 25*60,
      timerRunning: false,
      paused: false,
      clockTimer: '',
    }
    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.reset = this.reset.bind(this);

  }

  breakDecrement() {
    let currentValue = this.state.breakLength;
    if (currentValue === 1) {
      return;
    } else {
      this.setState({breakLength: currentValue-60})
    }
  }

  breakIncrement() {
    let currentValue = this.state.breakLength;
    if (currentValue === 60) {
      return;
    } else {
      this.setState({breakLength: currentValue+60})
    }
  }

  sessionDecrement() {
    let currentValue = this.state.sessionLength;
    if (currentValue === 1) {
      return;
    } else {
      this.setState({sessionLength: currentValue-60})
    }
  }

  sessionIncrement() {
    let currentValue = this.state.sessionLength;
    if (currentValue === 60) {
      return;
    } else {
      this.setState({sessionLength: currentValue+60})
    }
  }

  handleTimer() {
    let currentStatus = this.state.timerRunning;
    var timeRemaining = this.state.sessionLength;
    if (currentStatus === true) {
      //pause the timer
      let currentTimer = this.state.clockTimer;
      this.setState({
        clockTimer: clearInterval(currentTimer),
      })
    } else {
      this.setState({
        clockTimer: setInterval( () => {
        timeRemaining--;
        if (timeRemaining >= 0 ) {
          document.getElementById("time-left").textContent = this.displayTime(timeRemaining);
        }
      }, 1000),
    });

    }
    this.setState({
      timerRunning: currentStatus ? false : true,
    })
  }

  displayTime(time) {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    if (0< seconds && seconds < 10) {
      seconds = '0' + seconds;
    }
    if (seconds === 0 ) {
      seconds = '00';
    }
    return minutes + ":" + seconds;

  }

  displayBreakSessionTime(time) {
    return Math.floor(time/60);
  }

  reset() {
    let currentTimer = this.state.clockTimer;
    document.getElementById("time-left").textContent = '25:00';
    this.setState({
      timerRunning: false,
      sessionLength: 25*60,
      breakLength: 5*60,
      clockTimer: clearInterval(currentTimer),
    })

  }


  render(){
    return (
      <div className="pomodoro-clock">

        <header className="header">
          Pomodoro Clock
        </header>


        <div className="break-controls">
          <div id="break-label">Break Length</div>
          <img id="break-decrement"
               value="break-decrement"
               onClick={this.breakDecrement}
               className="up-down-image"
               src={downArrow}
               alt="arrow pointing down"
          />
          <div id="break-length">{this.displayBreakSessionTime(this.state.breakLength)}</div>
          <img id="break-increment"
               value="break-increment"
               onClick={this.breakIncrement}
               className="up-down-image"
               src={upArrow}
               alt="arrow pointing up"  />
        </div>

        <div className="session-controls">
          <div id="session-label">Session Length</div>
          <img id="session-decrement"
               value="session-decrement"
               onClick={this.sessionDecrement}
               className="up-down-image"
               src={downArrow}
               alt="arrow pointing down" />
          <div id="session-length">{this.displayBreakSessionTime(this.state.sessionLength)}</div>
          <img id="session-increment"
               value="session-increment"
               onClick={this.sessionIncrement}
               className="up-down-image"
               src={upArrow}
               alt="arrow pointing up"  />
        </div>

        <div className="current-session">
          <div id="timer-label">{this.state.currentStatus}</div>
          <div id="time-left">
            { this.displayTime(this.state.sessionLength) }
          </div>
          {this.state.timerRunning ?
          (<img id="start-stop"
                className="start-stop-image"
                src={pause}
                alt="pause"
                value="pause"
                onClick={this.handleTimer} />) :
          (<img id="start-stop"
                className="start-stop-image"
                src={start}
                alt="play"
                value="play"
                onClick={this.handleTimer}/>)
          }
          <img id="reset"
               value="reset"
               onClick={this.reset}
               className="reset-image"
               src={reset}
               alt="reset"  />
        </div>

        <div className="footer">
          <p>Designed & Coded by</p>
          <p id="author-name">Anne Thorsteinson</p>
          <p id="icon-credit">Icons made by <a href="http://fontawesome.io/" title="Dave Gandy">Dave Gandy</a> from <a href="https://www.flaticon.com/"
               title="Flaticon">www.flaticon.com</a>
          </p>
        </div>


      </div>

  );}
}

export default PomodoroClock;
