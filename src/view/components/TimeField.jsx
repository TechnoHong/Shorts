import React, { useState } from 'react';
import { TableCell } from '@mui/material';
import PropTypes from 'prop-types';

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
  return (
    timet.hours * 3600000 +
    timet.minutes * 60000 +
    timet.seconds * 1000 +
    timet.milliseconds
  );
};

const TimeField = (props) => {
  const { ytTime, row, idx, tflag, setRowTime } = props;
  const [time, setTime] = useState(convertToTime(ytTime));

  React.useEffect(() => {
    console.log('useEffect::changed ', convertToMs(time), ' --> ', ytTime);
    setTime(convertToTime(ytTime));
  }, [ytTime]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newTime = { ...time, [name]: Number(value) };
    const newTimeMs = convertToMs(newTime);

    // setTime(newTime);
    console.log(
      'handleChange::changed ',
      convertToMs(time),
      ' --> ',
      newTimeMs,
    );
    // setTime({ ...time, [name]: Number(value) });
    setRowTime(row, idx, tflag, newTimeMs);
  };

  // focus out 되었을때 쓰는 함수래
  // const handleBlur = (event) => {
  //     const { name, value } = event.target;
  //     const newTime = { ...time, [name]: Number(value) };
  //     setTime(newTime);
  //     console.log('handleBlur::changed ',convertToMs(time),' --> ', convertToMs(newTime)) ;
  //     // setTime({ ...time, [name]: Number(value) });
  //     // setMstime(convertToMs({ ...time, [name]: Number(value) }));
  //     setRowTime(row, tflag, convertToMs(newTime));
  // };

  return (
    <TableCell align="center">
      <input
        name="hours"
        value={time.hours}
        onChange={handleChange}
        style={{
          width: '40px',
          fontSize: '14px',
          background: 'transparent',
          border: 'none',
          textAlign: 'right',
        }}
        type="number"
        min="0"
        max="23"
      />
      시
      <input
        name="minutes"
        value={time.minutes}
        onChange={handleChange}
        style={{
          width: '40px',
          fontSize: '14px',
          background: 'transparent',
          border: 'none',
          textAlign: 'right',
        }}
        type="number"
        min="0"
        max="23"
      />
      분
      <input
        name="seconds"
        value={time.seconds}
        onChange={handleChange}
        style={{
          width: '40px',
          fontSize: '14px',
          background: 'transparent',
          border: 'none',
          textAlign: 'right',
        }}
        type="number"
        min="0"
        max="59"
      />
      초
      <input
        name="milliseconds"
        value={time.milliseconds}
        onChange={handleChange}
        style={{
          width: '55px',
          fontSize: '14px',
          background: 'transparent',
          border: 'none',
          textAlign: 'right',
        }}
        type="number"
        min="0"
        max="999"
      />
    </TableCell>
  );
};
TimeField.propTypes = {
  ytTime: PropTypes.number,
  row: PropTypes.object,
  idx: PropTypes.number,
  tflag: PropTypes.number,
  setRowTime: PropTypes.func,
};
export default TimeField;
