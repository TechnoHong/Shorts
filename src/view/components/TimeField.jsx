import React, { useState } from 'react';
import {convertToMs, convertToTime} from "../../utils/utils";
import {Box, Input} from "@mui/material";

const TimeField = ({ timestamp, onChange }) => {
  const [time, setTime] = useState(convertToTime(timestamp));

  React.useEffect(() => {
    setTime(convertToTime(timestamp));
  }, [timestamp]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newTime = { ...time, [name]: Number(value) };

    onChange(convertToMs(newTime))
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
    <Box padding={2}>
      <Input
        name="hours"
        value={time.hours.toString()}
        onChange={handleChange}
        type="number"
        inputProps={{
          min: 0,
          max: 59,
          style: {
            width: '40px',
            fontSize: '14px',
            background: 'transparent',
            border: 'none',
            textAlign: 'center',
          }
        }}
      />
      :
      <Input
        name="minutes"
        value={time.minutes.toString()}
        onChange={handleChange}
        type="number"
        inputProps={{
          min: 0,
          max: 59,
          style: {
            width: '40px',
            fontSize: '14px',
            background: 'transparent',
            border: 'none',
            textAlign: 'center',
          }
        }}
      />
      :
      <Input
        name="seconds"
        value={time.seconds.toString()}
        onChange={handleChange}
        type="number"
        inputProps={{
          min: 0,
          max: 59,
          style: {
            width: '40px',
            fontSize: '14px',
            background: 'transparent',
            border: 'none',
            textAlign: 'center',
          }
        }}
      />
    </Box>
  );
};

export default TimeField;
