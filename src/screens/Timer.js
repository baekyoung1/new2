import "../index.css";
import styled from 'styled-components/native';

import Tomato from "../assets/tomato.svg";
const React = require('react');


const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;



const SvgPlay = () => (
    <svg width="55" height="55" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M37.5 6.25C20.25 6.25 6.25 20.25 6.25 37.5C6.25 54.75 20.25 68.75 37.5 68.75C54.75 68.75 68.75 54.75 68.75 37.5C68.75 20.25 54.75 6.25 37.5 6.25ZM31.25 51.5625L50 37.5L31.25 23.4375V51.5625ZM12.5 37.5C12.5 51.2812 23.7188 62.5 37.5 62.5C51.2812 62.5 62.5 51.2812 62.5 37.5C62.5 23.7188 51.2812 12.5 37.5 12.5C23.7188 12.5 12.5 23.7188 12.5 37.5Z" fill="#FFF9F9"/>
    </svg>

);
const SvgPause = () => (
    <svg width="55" height="55" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M6.25 37.5C6.25 20.25 20.25 6.25 37.5 6.25C54.75 6.25 68.75 20.25 68.75 37.5C68.75 54.75 54.75 68.75 37.5 68.75C20.25 68.75 6.25 54.75 6.25 37.5ZM34.375 50H28.125V25H34.375V50ZM37.5 62.5C23.7188 62.5 12.5 51.2812 12.5 37.5C12.5 23.7188 23.7188 12.5 37.5 12.5C51.2812 12.5 62.5 23.7188 62.5 37.5C62.5 51.2812 51.2812 62.5 37.5 62.5ZM46.875 50H40.625V25H46.875V50Z" fill="white"/>
    </svg>

);

class Timer extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            timerOn: false,
            timerStart: 0,
            timerTime: 1500000,
            timerInitial: 1500000,
            timerShortRestInitial:300000,
            timerLongRestInitial:300000,
            timerState: 'study',
            settingRounds: {
                currentRound: 0,
                roundsBeforeLongBreakInitial: 5,
                totalStudyRoundsGoal: 5
            }
        };
    }
    startTimer = () => {
        this.setState({
            timerOn: true
        });
        this.timer = setInterval(() => {
            const newTime = this.state.timerTime- 1000;
            if (newTime >= 0) {
                this.setState({
                    timerTime: newTime
                });
            } else {
                if (this.state.timerState === 'study') {
                    if (this.state.settingRounds.currentRound % this.state.settingRounds.roundsBeforeLongBreakInitial
                    === 3) {
                        this.setState(prevState =>({
                            timerState: "longBreak",
                            timerTime: this.state.timerLongRestInitial,
                            settingRounds : {
                                ...prevState.settingRounds,
                                currentRound: this.state.settingRounds.currentRound + 1
                            }
                        }));
                        alert("Break Time");
                    } else {
                        this.setState(prevState=>({
                            timerState: "shortRest",
                            timerTime: this.state.timerShortRestInitial,
                            settingRounds : {
                                ...prevState.settingRounds,
                                currentRound: this.state.settingRounds.currentRound + 1
                            }
                        }));
                        alert("Break Time");
                    }
                } else {
                    this.setState({
                        timerState: 'study',
                        timerTime: this.state.timerInitial
                    });
                    alert("Back to Work");
                }
            }
        },1000)
    };
    stopTimer = () => {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
    };
    resetTimer = () => {
        if (this.state.timerOn === false) {
            this.setState({
                timerTime: this.state.timerStart
            });
        }
    };
    adjustTimer = (input, state) => {
        const { timerState, timerTime, timerOn, timerInitial, timerShortRestInitial, timerLongRestInitial } = this.state;
        const max = 216000000;
            if (state === "study" && (!timerOn || timerState !== 'study')) {
                // if (input === "incHours" && timerTime + 3600000 < max) {
                //     this.setState({timerInitial: timerInitial + 3600000});
                // } else if (input === "decHours" && timerInitial - 3600000 >= 0) {
                //     this.setState({timerInitial: timerInitial - 3600000});
                // } else
                if (input === "incMinutes" && timerInitial + 60000 < max) {
                    this.setState(
                        {
                            timerInitial: timerInitial + 60000,
                        });
                    if (timerState ==='study') {
                        this.setState(
                            {
                                timerTime: this.state.timerInitial + 60000,
                                timerStart: this.state.timerInitial + 60000
                            });
                    }
                } else if (input === "decMinutes" && timerInitial - 60000 >= 0) {
                    this.setState({
                        timerInitial: timerInitial - 60000,
                    });
                    if (timerState ==='study') {
                        this.setState(
                            {
                                timerTime: this.state.timerInitial - 60000,
                                timerStart: this.state.timerInitial - 60000
                            });
                    }

                }
                // } else if (input === "incSeconds" && timerInitial + 1000 < max) {
                //     this.setState({timerInitial: timerInitial + 1000});
                // } else if (input === "decSeconds" && timerInitial - 1000 >= 0) {
                //     this.setState({timerInitial: timerInitial - 1000});
                // }
            } else if (state === "shortRest" && (!timerOn || timerState !== 'shortRest')) {
                if (input === "incMinutes" && timerShortRestInitial + 60000 < max) {
                    this.setState(
                        {
                            timerShortRestInitial: timerShortRestInitial + 60000,
                        });
                    if (timerState ==='shortRest') {
                        this.setState(
                            {
                                timerTime: this.state.timerShortRestInitial + 60000,
                                timerStart: this.state.timerShortRestInitial + 60000
                            });
                    }
                } else if (input === "decMinutes" && timerShortRestInitial - 60000 >= 0) {
                    this.setState({
                        timerShortRestInitial: timerShortRestInitial - 60000,
                    });
                    if (timerState ==='shortRest') {
                        this.setState(
                            {
                                timerTime: this.state.timerShortRestInitial - 60000,
                                timerStart: this.state.timerShortRestInitial - 60000
                            });
                    }
                }
            } else if (state === "longRest" && (!timerOn || timerState !== "longRest" )) {
                if (input === "incMinutes" && timerLongRestInitial + 60000 < max) {
                    this.setState(
                        {
                            timerLongRestInitial: timerLongRestInitial + 60000,
                        });

                    if (timerState ==='longRest') {
                        this.setState(
                            {
                                timerTime: this.state.timerLongRestInitial + 60000,
                                timerStart: this.state.timerLongRestInitial + 60000
                            });
                    }
                } else if (input === "decMinutes" && timerLongRestInitial - 60000 >= 0) {
                    this.setState({
                        timerLongRestInitial: timerLongRestInitial - 60000,
                    });
                    if (timerState ==='longRest') {
                        this.setState(
                            {
                                timerTime: this.state.timerLongRestInitial - 60000,
                                timerStart: this.state.timerLongRestInitial - 60000
                            });
                    }
                }
            } else if (state === "round") {
                if (input === "incRound") {
                    this.setState(prevState => ({
                        settingRounds :{
                            ...prevState.settingRounds,
                            roundsBeforeLongBreakInitial: this.state.settingRounds.roundsBeforeLongBreakInitial + 1
                        }
                    }))
                } else {
                    this.setState(prevState => ({
                        settingRounds :{
                            ...prevState.settingRounds,
                            roundsBeforeLongBreakInitial: this.state.settingRounds.roundsBeforeLongBreakInitial - 1
                        }
                    }))
                }
            } else if (state === "goal") {
                if (input === "incGoal") {
                    this.setState(prevState => ({
                        settingRounds :{
                            ...prevState.settingRounds,
                            totalStudyRoundsGoal: this.state.settingRounds.totalStudyRoundsGoal + 1
                        }
                    }))
                } else {
                    this.setState(prevState => ({
                        settingRounds :{
                            ...prevState.settingRounds,
                            totalStudyRoundsGoal: this.state.settingRounds.totalStudyRoundsGoal - 1
                        }
                    }))
                }
            }
    };

    render() {
        const { timerTime, timerStart, timerOn, timerInitial, timerShortRestInitial, timerLongRestInitial, settingRounds } = this.state;
        let seconds = ("0" + (Math.floor((timerTime/ 1000) % 60) % 60)).slice(-2);
        let minutes = ("0" + Math.floor((timerTime/ 60000) % 60)).slice(-2);

        let studyLength = ("0" + Math.floor((timerInitial/ 60000) % 60)).slice(-2);
        let shortRestLength = ("0" + Math.floor((timerShortRestInitial/ 60000) % 60)).slice(-2 );
        let longRestLength = ("0" + Math.floor((timerLongRestInitial/ 60000) % 60)).slice(-2 );

        let round = settingRounds.currentRound % settingRounds.roundsBeforeLongBreakInitial;
        let roundPerSession = settingRounds.roundsBeforeLongBreakInitial;
        let currentRound = settingRounds.currentRound;
        let goal = settingRounds.totalStudyRoundsGoal;
        return (
          <Container>
            <div className="Countdown-timer">
                <div className="container">
                    <img className="tomato-img" src={Tomato}/>
                    <div className="Countdown-time">
                        {minutes} : {seconds}
                    </div>
                    {timerOn === false && (timerStart === 0 || timerTime === timerStart) && (
                        <button className="Button-start" onClick={this.startTimer}>
                            <SvgPlay className="SvgPlay"/>
                        </button>
                    )}
                    {timerOn === true && timerTime >= 1000 && (
                        <button className="Button-stop" onClick={this.stopTimer}>
                            <SvgPause/>
                        </button>
                    )}
                    {timerOn === false &&
                    (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
                        <button className="Button-start" onClick={this.startTimer}>
                            <SvgPlay className="SvgPlay"/>
                        </button>
                    )}
                </div>
                <div>
                    <div className="container1">
                <div className="goal-setting">
                    <div className="adjustGoal">
                        <p>Round</p>
                        <div className="goal-container">
                        
                        <div className="adjustGoalContainer">
                            <button onClick={() => this.adjustTimer("decRound", "round")}>-</button>
                            <div className="setTime">{round}/</div>
                            <div className="setTime">{roundPerSession} </div>
                            <button onClick={() => this.adjustTimer("incRound",  "round")}>+</button>
                        </div>
                        </div>
                    </div>
                    <div className="adjustGoal">
                        <p> Goals</p>
                        <div className="goal-container">
                        
                        <div className="adjustGoalContainer">
                            <button onClick={() => this.adjustTimer("deccGoal", "goal")}>-</button>
                            <div className="setTime">{currentRound}/</div>
                            <div className="setTime">{goal} </div>
                            <button onClick={() => this.adjustTimer("inGoal", "goal")}>+</button>
                        </div>
                        </div>
                    </div>
                </div>

                    <div className="container-adjustment">
                        <div className="adjustTimeOutsideContainer">
                            <div className="adjustTime">
                                <p> Focus Time</p>
                                <div className="adjustTimeContainer">
                                    <button onClick={() => this.adjustTimer("decMinutes", "study")}>-</button>
                                    <div className="setTime">{studyLength} </div>
                                    <button onClick={() => this.adjustTimer("incMinutes", "study")}>+</button>
                                </div>
                                <p> mins </p>
                            </div>
                            <div className="adjustTime">
                                <p>Short Break</p>
                                <div className="adjustTimeContainer">
                                    <button onClick={() => this.adjustTimer("decMinutes", "shortRest")}>-</button>
                                    <div className="setTime">{shortRestLength} </div>
                                    <button onClick={() => this.adjustTimer("incMinutes", "shortRest")}>+</button>
                                </div>
                                <p> mins </p>
                            </div>
                            <div className="adjustTime">
                                <p>Long Break</p>
                                <div className="adjustTimeContainer">
                                    <button onClick={() => this.adjustTimer("decMinutes", "longRest")}>-</button>
                                    <div className="setTime">{longRestLength} </div>
                                    <button onClick={() => this.adjustTimer("incMinutes", "longRest")}>+</button>
                                </div>
                                <p> mins </p>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
          </Container>
        );
    }
}
export default Timer;