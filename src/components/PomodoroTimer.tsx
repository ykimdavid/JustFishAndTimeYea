import React, { useState, useEffect } from 'react';
import Fish from './Fish'
import { useSpring, animated } from 'react-spring'

interface PomodoroTimerProps {
    setCreateNewFish: Function
}


const PomodoroTimer: React.FC<PomodoroTimerProps> = ({setCreateNewFish}) => {
    const workInterval = 25 * 60; // 25 minutes
    const shortBreak = 5 * 60; // 5 minutes
    const longBreak = 15 * 60; // 15 minutes
    const [timeLeft, setTimeLeft] = useState(workInterval);
    const [isActive, setIsActive] = useState(false);
    const [sessionType, setSessionType] = useState('Work'); // 'Work' or 'Break'
    const [sessionCount, setSessionCount] = useState(0);

    useEffect(() => {
        if ('Notification' in window) {
            Notification.requestPermission();
        }

        let interval: any | null = null;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((timeLeft) => {
                    return timeLeft - 1;
                });
            }, 1000);
        } else if (timeLeft === 0) {
            endSession();
        }

        if (timeLeft % 10 === 0) {
            setCreateNewFish(true)
        }

        document.title = `${formatTimeLeft(timeLeft)} - ${sessionType}`;

        return () => clearInterval(interval!);
    }, [isActive, timeLeft, sessionType, sessionCount]);

    const endSession = () => {
        if (sessionType === 'Work') {
            setSessionCount(sessionCount + 1);
            setTimeLeft(sessionCount % 4 === 0 ? longBreak : shortBreak);
            setSessionType('Break');
            sendNotification('Time for a break!');
        } else {
            setTimeLeft(workInterval);
            setSessionType('Work');
            sendNotification('Back to work!');
        }
    }

    const sendNotification = (message: string) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(message);
        }
    }

    const toggle = () => {
        setIsActive(!isActive);
    };

    const reset = () => {
        setTimeLeft(workInterval);
        setIsActive(false);
        setSessionType('Work');
        setSessionCount(0);
    };

    const formatTimeLeft = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div>
            <div className="timer">{formatTimeLeft(timeLeft)}</div>
            <div className="sessionType">{sessionType} Session</div>
            <button onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
            <button onClick={reset}>Reset</button>
            <button onClick={endSession}>Skip</button>
        </div>
    );
};

export default PomodoroTimer;
