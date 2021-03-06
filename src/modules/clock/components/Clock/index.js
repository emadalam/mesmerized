import React, { Component } from 'react';
import { padNumber } from '@utils/general.utils';
import './style.css';

const TEWELVE_HRS = 12;
const ONE_SECOND = 1000;

class Clock extends Component {
    static defaultProps = {
        tewelveHourFormat: false,
        blinkForSeconds: false,
        showDate: true,
    };

    state = {
        date: new Date(),
        hours: 0,
        minutes: 0,
    };

    updateTime = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        this.setState({hours, minutes, date});
    };

    componentDidMount() {
        this.updateTime();
        this.intervalId = setInterval(this.updateTime, ONE_SECOND);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        let { hours, minutes, date } = this.state;
        const { tewelveHourFormat, blinkForSeconds, showDate } = this.props;

        if (tewelveHourFormat && hours > TEWELVE_HRS) {
            hours = hours - TEWELVE_HRS;
        }

        hours = padNumber(hours);
        minutes = padNumber(minutes);

        let clockClass = 'clock';
        if (blinkForSeconds) clockClass = `${clockClass} clock_blink`;

        return (
            <div className={ clockClass }>
                <div className="clock__hours">{ hours }</div>
                <div className="clock__minutes">{ minutes }</div>
                { showDate &&
                    <div className="clock__date">{ date.toDateString() }</div>
                }
            </div>
        );
    }
}

export default Clock;
