import React, { useState } from 'react';
import {TableCell} from "@mui/material";
import PropTypes from "prop-types";

function TimeField(props) {
    const { ytTime } = props;

    const convertToTime = (milliseconds) => {
        const hours = Math.floor(milliseconds / 3600000);
        milliseconds %= 3600000;
        const minutes = Math.floor(milliseconds / 60000);
        milliseconds %= 60000;
        const seconds = Math.floor(milliseconds / 1000);
        milliseconds %= 1000;
        return { hours, minutes, seconds, milliseconds };
    };

    const [time, setTime] = useState(convertToTime(ytTime * 1000));

    const handleChange = (event) => {
        const { name, value } = event.target;
        setTime({ ...time, [name]: Number(value) });
    };

    const handleBlur = () => {
        const totalMilliseconds =
            time.hours * 3600000 + time.minutes * 60000 + time.seconds * 1000 + time.milliseconds;
        const convertedTime = convertToTime(totalMilliseconds);
        setTime(convertedTime);
    };

    return (
        <TableCell align="center">
            <input
                name="hours"
                value={time.hours}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: '30px', fontSize: '14px', background: 'transparent', border: 'none' }}
                type="text"
                pattern="[0-9]*"
                onKeyDown={(e) => {
                    if (e.keyCode === 38 || e.keyCode === 40) {
                        e.preventDefault();
                    }
                }}
                onWheel={(e) => {
                    e.currentTarget.blur();
                    e.preventDefault();
                }}
            />
            시
            <input
                name="minutes"
                value={time.minutes}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: '30px', fontSize: '14px', background: 'transparent', border: 'none' }}
                type="text"
                pattern="[0-9]*"
                onKeyDown={(e) => {
                    if (e.keyCode === 38 || e.keyCode === 40) {
                        e.preventDefault();
                    }
                }}
                onWheel={(e) => {
                    e.currentTarget.blur();
                    e.preventDefault();
                }}
            />
            분
            <input
                name="seconds"
                value={time.seconds}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: '30px', fontSize: '14px', background: 'transparent', border: 'none' }}
                type="text"
                pattern="[0-9]*"
                onKeyDown={(e) => {
                    if (e.keyCode === 38 || e.keyCode === 40) {
                        e.preventDefault();
                    }
                }}
                onWheel={(e) => {
                    e.currentTarget.blur();
                    e.preventDefault();
                }}
            />
            초
            <input
                name="milliseconds"
                value={time.milliseconds}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: '30px', fontSize: '14px', background: 'transparent', border: 'none' }}
                type="text"
                pattern="[0-9]*"
                onKeyDown={(e) => {
                    if (e.keyCode === 38 || e.keyCode === 40) {
                        e.preventDefault();
                    }
                }}
                onWheel={(e) => {
                    e.currentTarget.blur();
                    e.preventDefault();
                }}
            />
        </TableCell>
    );
};
TimeField.propTypes = {
    ytTime: PropTypes.number,
};
export default TimeField;
