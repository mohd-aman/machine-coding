import { useRef, useState, useEffect } from "react";
import "./CountDownTimer.css";

export default function CountDownTimer() {
    const [time, setTime] = useState({ hour: 0, minute: 0, second: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);

    const handleChange = (e, field) => {
        let value = parseInt(e.target.value, 10) || 0;
        const timeCopy = { ...time, [field]: value };
        timeCopy.minute += Math.floor(timeCopy.second / 60);
        timeCopy.second = timeCopy.second % 60;
        timeCopy.hour += Math.floor(timeCopy.minute / 60);
        timeCopy.minute = timeCopy.minute % 60;
        setTime(timeCopy);
    };

    const handleReset = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setIsRunning(false);
        setTime({ hour: 0, minute: 0, second: 0 });
    };

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => {
                    let { hour, minute, second } = prevTime;
                    second--;
                    if (second < 0) {
                        second = 59;
                        minute--;
                        if (minute < 0) {
                            minute = 59;
                            hour--;
                        }
                    }
                    if (hour < 0) {
                        clearInterval(intervalRef.current);
                        return { hour: 0, minute: 0, second: 0 };
                    }
                    return { hour, minute, second };
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const startTimer = () => {
        if (time.hour === 0 && time.minute === 0 && time.second === 0) {
            return;
        }
        setIsRunning(!isRunning);
    };

    return (
        <div className="timer-container">
            {!isRunning ? (
                <>
                    <input
                        value={time.hour}
                        onChange={(e) => handleChange(e, "hour")}
                        placeholder="HH"
                    />
                    :
                    <input
                        value={time.minute}
                        onChange={(e) => handleChange(e, "minute")}
                        placeholder="MM"
                    />
                    :
                    <input
                        value={time.second}
                        onChange={(e) => handleChange(e, "second")}
                        placeholder="SS"
                    />
                </>
            ) : (
                <>
                <div className="countSpan">
                    {`${String(time.hour).padStart(2, "0")}`}
                </div>:
                <div className="countSpan">{`${String(time.minute).padStart(2, "0")}`}</div>:
                <div className="countSpan">{`${String(time.second).padStart(2, "0")}`}</div>
                </>
                

            )}
            <div>
                <button onClick={startTimer}>{isRunning ? "Pause" : "Start"}</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
}