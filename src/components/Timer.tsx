import React, {Component, useState, useEffect} from "react";

interface TimerState {
    time: number;
    timerOn: boolean;
}

interface TimerProps {
    initialSeconds: number,
}

export class Timer extends Component<TimerProps, TimerState> {
    intervalId: any | null = null;

    constructor(props: TimerProps) {
        super(props);
        this.state = {time: props.initialSeconds, timerOn: false}
    }

    componentDidUpdate(prevProps: TimerProps, prevState: TimerState) {
        if (this.state.timerOn && this.state.time > 0 && !prevState.timerOn) {
            this.intervalId = setInterval(() => {
                this.setState((prevState) => ({ time: prevState.time - 1 }));
              }, 1000);
        }

        if (this.state.time === 0 && prevState.timerOn) {
            //stop timer
        }
    }

    componentWillUnmount() {
        // stop timer
    }

    startTimer = () => {
        if (!this.state.timerOn && this.state.time > 0) {
            this.setState({ timerOn: true });
          }
    }

    stopTimer = () => {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
        this.setState({ timerOn: false });
    };

    resetTimer = () => {
        this.stopTimer();
        this.setState({ time: this.props.initialSeconds });
    };
    
    getMinutes = (time: number): number => {
        return Math.floor((time) / 60);
    }

    getSeconds = (time: number): number => {
        return time - Math.floor((time) / 60) * 60;
    }

    render() {
        const seconds = this.getSeconds(this.state.time)
        const minutes = this.getMinutes(this.state.time);
        return (
            <div>
                <h2>{`${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`}</h2>
                <button onClick={this.startTimer}>Start</button>
    
                <button onClick={this.resetTimer}>Reset</button>
    
            </div>
        );
    }

};

export default Timer;