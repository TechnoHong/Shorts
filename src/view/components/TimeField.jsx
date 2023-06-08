import React, { useState } from 'react';

const convertToTime = (milliseconds) => {
  const date = new Date(milliseconds);
  return {
    hours: date.getUTCHours(),
    minutes: date.getUTCMinutes(),
    seconds: date.getUTCSeconds(),
  };
};
const convertToMs = (timet) => {
  return timet.hours * 3600000 + timet.minutes * 60000 + timet.seconds * 1000;
};

const TimeField = (props) => {
  const { ytTime, row, idx, tflag, setRowTime } = props;
  const [time, setTime] = useState(convertToTime(ytTime));

  React.useEffect(() => {
    setTime(convertToTime(ytTime));
  }, [ytTime]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newTime = { ...time, [name]: Number(value) };
    const newTimeMs = convertToMs(newTime);

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
    <>
      <input
        name="hours"
        value={time.hours.toString()}
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
      :
      <input
        name="minutes"
        value={time.minutes.toString()}
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
      :
      <input
        name="seconds"
        value={time.seconds.toString()}
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
    </>
  );
};

export default TimeField;
