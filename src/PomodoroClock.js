import React from 'react';
import './PomodoroClock.css';
import LengthControl from './components/LengthControl.js';
import Timer from './components/Timer.js';


import tenSecondAlarm from './media/ten-second-alarm.mp3';
import beep from './media/beep.mp3';

class PomodoroClock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'session',
      breakLength: 5*60,
      sessionLength: 11,
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
    if (currentValue/60 <= 1) {
      return;
    } else {
      this.setState({breakLength: currentValue-60})
    }
  }

  breakIncrement() {
    let currentValue = this.state.breakLength;
    if (currentValue/60 === 60) {
      return;
    } else {
      this.setState({breakLength: currentValue+60})
    }
  }

  sessionDecrement() {
    let currentValue = this.state.sessionLength;
    if (currentValue/60 <= 1) {
      return;
    } else {
      this.setState({sessionLength: currentValue-60})
    }
  }

  sessionIncrement() {
    let currentValue = this.state.sessionLength;
    if (currentValue/60 === 60) {
      return;
    } else {
      this.setState({sessionLength: currentValue+60})
    }
  }

  handleTimer() {
    let isTimerRunning = this.state.timerRunning;
    let currentStatus = this.state.status;
    let timeRemaining = currentStatus === 'session' ? this.state.sessionLength : this.state.breakLength;
    if (isTimerRunning === true) {
      //pause the timer
      let currentTimer = this.state.clockTimer;
      if (currentStatus==="session") {
        this.setState({ sessionLength: timeRemaining,
                        clockTimer: clearInterval(currentTimer),
                      });
      } else {
        this.setState({ breakLength: timeRemaining,
                        clockTimer: clearInterval(currentTimer),
                      });
      }
      this.stopCountdown();
    } else {
      this.setState({
        clockTimer: setInterval( () => {
        timeRemaining--;
        if (timeRemaining >= 0 ) {
          document.getElementById("time-left").textContent = this.displayTime(timeRemaining);
        }
        if (timeRemaining === 10) {
          document.getElementById("time-left").classList.add("redText");
          document.getElementById("timer-label").classList.add("redText");
          this.playCountdown();
        }
        if (timeRemaining === 0) {
          this.playAlarm();
          this.switchSession();
        }
      }, 1000),
    });
    }
    this.setState({
      timerRunning: isTimerRunning ? false : true,
    })
  }

  displayTime(time) {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    if (0< seconds && seconds < 10) { seconds = '0' + seconds; }
    if (seconds === 0 ) { seconds = '00'; }
    return minutes + ":" + seconds;
  }

  switchSession(){
    let currentStatus = this.state.status;
    this.setState({
      status: currentStatus === 'session' ? 'break' : 'session',
      timerRunning: false,
    });
    document.getElementById("timer-label").classList.remove("redText");
    document.getElementById("time-left").classList.remove("redText");
  }

  stopCountdown(){
    document.getElementById("ten-second-alarm").pause();
  }

  playCountdown(){
    document.getElementById("ten-second-alarm").play();
  }

  stopAlarm(){
    document.getElementById("beep").pause();
  }

  playAlarm(){
    document.getElementById("beep").play();
  }



  displayBreakSessionTime(time) {
    return Math.floor(time/60);
  }

  reset() {
    document.getElementById("time-left").classList.remove("redText");
    document.getElementById("timer-label").classList.remove("redText");
    let currentTimer = this.state.clockTimer;
    document.getElementById("time-left").textContent = '25:00';
    this.setState({
      status: 'session',
      timerRunning: false,
      sessionLength: 25*60,
      breakLength: 5*60,
      clockTimer: clearInterval(currentTimer),
    })
  }


  render(){

    return (
      <div className="pomodoro-clock">

        <header className="header">Pomodoro Clock</header>

        <LengthControl controlType="break"
                       decrement={this.breakDecrement}
                       increment={this.breakIncrement}
                       display={this.displayBreakSessionTime}
                       time={this.state.breakLength}/>

       <LengthControl controlType="session"
                      decrement={this.sessionDecrement}
                      increment={this.sessionIncrement}
                      display={this.displayBreakSessionTime}
                      time={this.state.sessionLength}/>

       <Timer         type={this.state.status}
                      startTime={this.state.status === 'session' ? this.state.sessionLength: this.state.breakLength}
                      displayTime={this.displayTime}
                      running={this.state.timerRunning}
                      handleTimer={this.handleTimer}
                      reset={this.reset}/>

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
