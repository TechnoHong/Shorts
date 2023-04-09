import React, {useState} from 'react';
import {TableCell} from "@mui/material";
import PropTypes from "prop-types";

const convertToTime = (milliseconds) => {
    const date = new Date(milliseconds);
    return {
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds(),
        milliseconds: date.getUTCMilliseconds(),
    };
};
const convertToMs = (timet) => {
    return timet.hours * 3600000 +
        timet.minutes * 60000 +
        timet.seconds * 1000 +
        timet.milliseconds;
};

const TimeField = ({ ytTime }) => {
    const [msTime, setMstime] = useState(ytTime);
    const [time, setTime] = useState(convertToTime(ytTime));

    // time 변경 함수를 부모에서 갖고 있어서, 변경될때마다 얘를 호출해야 할것으로 보임
    React.useEffect(() => {
        setMstime(ytTime);
        setTime(convertToTime(ytTime));
    }, [ytTime]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTime({ ...time, [name]: Number(value) });
        setMstime(convertToMs({ ...time, [name]: Number(value) }));
        console.log('handleChange::changed to', msTime, ytTime) ;
    };

    const handleBlur = () => {
        const totalMilliseconds = convertToMs(time) ;
        setMstime(totalMilliseconds);
        const convertedTime = convertToTime(totalMilliseconds);
        setTime(convertedTime);
        console.log('handleBlur::changed to', totalMilliseconds, ytTime) ;

    };

    return (
        <TableCell align="center">
            <input
                name="hours"
                value={time.hours}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: '40px', fontSize: '14px', background: 'transparent', border: 'none' }}
                type="number"
                min="0"
                max="23"
            />
            시
            <input
                name="minutes"
                value={time.minutes}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: '40px', fontSize: '14px', background: 'transparent', border: 'none' }}
                type="number"
                min="0"
                max="23"
            />
            분
            <input
                name="seconds"
                value={time.seconds}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: '40px', fontSize: '14px', background: 'transparent', border: 'none' }}
                type="number"
                min="0"
                max="59"
            />
            초
            <input
                name="milliseconds"
                value={time.milliseconds}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: '50px', fontSize: '14px', background: 'transparent', border: 'none' }}
                type="number"
                min="0"
                max="999"
            />
        </TableCell>
    );
};
TimeField.propTypes = {
    ytTime: PropTypes.number,
};
export default TimeField;
