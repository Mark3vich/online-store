import React from 'react';
import { Card, Row, Col } from 'antd';
import './Timer.css';

// Определяем интерфейс для пропсов
interface TimerProps {
    initialDays?: number;
    initialHours?: number;
    initialMinutes?: number;
    initialSeconds?: number;
}

// Определяем интерфейс для состояния
interface TimerState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

class Timer extends React.Component<TimerProps, TimerState> {
    timerInterval: NodeJS.Timeout | null;

    constructor(props: TimerProps) {
        super(props);

        // Устанавливаем начальное состояние
        this.state = {
            days: props.initialDays || 0,
            hours: props.initialHours || 0,
            minutes: props.initialMinutes || 0,
            seconds: props.initialSeconds || 0,
        };

        this.timerInterval = null;
    }

    componentDidMount() {
        // Запускаем таймер при монтировании компонента
        this.timerInterval = setInterval(this.updateTimer, 1000);
    }

    componentWillUnmount() {
        // Очищаем интервал перед размонтированием компонента
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    updateTimer = () => {
        const { days, hours, minutes, seconds } = this.state;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            // Остановка таймера, когда все значения дошли до нуля
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
            }
            return;
        }

        if (seconds > 0) {
            this.setState({ seconds: seconds - 1 });
        } else if (minutes > 0) {
            this.setState({ minutes: minutes - 1, seconds: 59 });
        } else if (hours > 0) {
            this.setState({ hours: hours - 1, minutes: 59, seconds: 59 });
        } else if (days > 0) {
            this.setState({ days: days - 1, hours: 23, minutes: 59, seconds: 59 });
        }
    };

    render() {
        const { days, hours, minutes, seconds } = this.state;

        return (
            <Card className="timer-card">
                <Row gutter={16} justify="center">
                    <Col>
                        <div className="timer-item">
                            <span className="timer-value">{days < 10 ? `0${days}` : days}</span>
                            <span className="timer-label">Days</span>
                        </div>
                    </Col>
                    <div className='timer-value'>:</div>
                    <Col>
                        <div className="timer-item">
                            <span className="timer-value">{hours < 10 ? `0${hours}` : hours}</span>
                            <span className="timer-label">Hours</span>
                        </div>
                    </Col>
                    <div className='timer-value'>:</div>
                    <Col>
                        <div className="timer-item">
                            <span className="timer-value">{minutes < 10 ? `0${minutes}` : minutes}</span>
                            <span className="timer-label">Minutes</span>
                        </div>
                    </Col>
                    <div className='timer-value'>:</div>
                    <Col>
                        <div className="timer-item">
                            <span className="timer-value">{seconds < 10 ? `0${seconds}` : seconds}</span>
                            <span className="timer-label">Seconds</span>
                        </div>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Timer;
