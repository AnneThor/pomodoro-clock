import React from 'react';
import './PomodoroClock.css';
import LengthControl from './components/LengthControl.js';
import Timer from './components/Timer.js';


class PomodoroClock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'session',
      breakLength: 5,
      sessionLength: 25,
      timeRemaining: 25*60,
      timerRunning: false,
      clockTimer: '',
    }
    this.handleBreakIncrease=this.handleBreakIncrease.bind(this)
    this.handleBreakDecrease=this.handleBreakDecrease.bind(this);
    this.handleSessionIncrease=this.handleSessionIncrease.bind(this)
    this.handleSessionDecrease=this.handleSessionDecrease.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.timerFunction=this.timerFunction.bind(this);

  }

  handleBreakIncrease(){
    if (this.state.timerRunning === true) {
      return;
    } else if (this.state.breakLength === 60) {
      return;
    } else {
      let currentLength=this.state.breakLength;
      let currentStatus = this.state.status;
      let currentTimeRemaining = this.state.timeRemaining;
      this.setState( {breakLength: currentLength+1,
                      timeRemaining: (currentStatus === "break" ? (currentLength+1)*60 : currentTimeRemaining),
                    });
    }
  }

  handleBreakDecrease() {
    if (this.state.timerRunning === true) {
      return;
    } else if (this.state.breakLength === 1) {
      return;
    } else {
      let currentLength=this.state.breakLength;
      let currentStatus= this.state.status;
      let currentTimeRemaining=this.state.timeRemaining;
      this.setState({
        breakLength: currentLength-1,
        timeRemaining: (currentStatus === "break" ? (currentLength-1)*60 : currentTimeRemaining),
      });
    }
  }

  handleSessionIncrease(){
    if (this.state.timerRunning === true) {
      return;
    } else if (this.state.sessionLength === 60) {
      return;
    } else {
      let currentLength=this.state.sessionLength;
      let currentStatus = this.state.status;
      let currentTimeRemaining = this.state.timeRemaining;
      this.setState({
        sessionLength: currentLength+1,
        timeRemaining: (currentStatus === "session" ? (currentLength+1)*60 : currentTimeRemaining),
      });
    }
  }

  handleSessionDecrease() {
    if (this.state.timerRunning === true) {
      return;
    } else if (this.state.sessionLength === 1) {
      return;
    } else {
      let currentLength=this.state.sessionLength;
      let currentStatus = this.state.status;
      let currentTimeRemaining = this.state.timeRemaining;
      this.setState({
        sessionLength: currentLength-1,
        timeRemaining: (currentStatus === "session" ? (currentLength-1)*60 : currentTimeRemaining),
      });
    }
  }

  handleTimer() {
    let isTimerRunning = this.state.timerRunning;
    //now we need to handle a pause
    if (isTimerRunning === true) {
      let currentTimer = this.state.clockTimer;
      this.setState({ clockTimer: clearInterval(currentTimer)});
//      this.stopCountdown();
    } else { //clock is starting so we need to countdown and store remaining seconds
      this.setState({
        clockTimer: setInterval( this.timerFunction, 1000),
      })
    }
    this.setState({
      timerRunning: isTimerRunning ? false : true,
    })
  }

  timerFunction(){
    let secondsRemaining = this.state.timeRemaining;
    secondsRemaining--;
    if (secondsRemaining >= 0 ) {
      document.getElementById("time-left").textContent = this.displayTime(secondsRemaining);
    }
/*    if (secondsRemaining === 10) {
      document.getElementById("time-left").classList.add("redText");
      document.getElementById("timer-label").classList.add("redText");
      this.playCountdown();
    }
    */
    if (secondsRemaining === 0) {
      this.playAlarm();
    }
    if (secondsRemaining === -1) {
      this.switchSession();
      return;
    }
    this.setState({timeRemaining: secondsRemaining});
  }

  displayTime(time) {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    if (0< minutes && minutes < 10) {minutes = '0' + minutes};
    if (minutes===0) { minutes = '00'};
    if (0< seconds && seconds < 10) { seconds = '0' + seconds; }
    if (seconds === 0 ) { seconds = '00'; }
    return minutes + ":" + seconds;
  }

  switchSession(){
    let currentStatus = this.state.status;
    let nextSession = currentStatus === "session" ? this.state.breakLength*60 :  this.state.sessionLength*60;
    let currentTimer = this.state.clockTimer;
    this.setState({
      clockTimer: clearInterval(currentTimer),
      status: currentStatus === 'session' ? 'break' : 'session',
      timerRunning: false,
      timeRemaining: nextSession,
    });
    document.getElementById("timer-label").classList.remove("redText");
    document.getElementById("time-left").classList.remove("redText");
    this.handleTimer();
  }

/*
  stopCountdown(){
    document.getElementById("ten-second-alarm").pause();
  }

  playCountdown(){
    document.getElementById("ten-second-alarm").play();
  }
  */

  stopAlarm(){
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime=0;
  }

  playAlarm(){
    document.getElementById("beep").play();
  }



  displayBreakSessionTime(time) {
    return Math.floor(time/60);
  }

  reset() {
    this.stopAlarm();
//    this.stopCountdown();
    document.getElementById("time-left").classList.remove("redText");
    document.getElementById("timer-label").classList.remove("redText");
    let currentTimer = this.state.clockTimer;
    this.setState({
      status: 'session',
      timerRunning: false,
      sessionLength: 25,
      breakLength: 5,
      clockTimer: clearInterval(currentTimer),
      timeRemaining: 25*60,
    })
  }


  render(){

    return (
      <div className="pomodoro-clock">

        <header className="header">Pomodoro Clock</header>

        <LengthControl controlType="break"
                       decrement={this.handleBreakDecrease}
                       increment={this.handleBreakIncrease}
                       time={this.state.breakLength}/>

       <LengthControl controlType="session"
                      decrement={this.handleSessionDecrease}
                      increment={this.handleSessionIncrease}
                      time={this.state.sessionLength}/>

       <Timer         type={this.state.status}
                      startTime={this.state.timeRemaining}
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
