import React, { useState } from 'react';
import { Box, Grid, Input, InputAdornment, Slider } from '@mui/material';

const RangeSlider = () => {
  const [value, setValue] = useState(60);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 60) {
      setValue(60);
    }
  };

  return (
    <Box
      sx={{
        padding: '1.5rem',
        width: '100%',
      }}
      maxWidth="sm"
    >
      <Grid container spacing={5} justifyContent="center">
        <Grid item xs={8} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Slider
            defaultValue={value}
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            min={0}
            max={60}
            marks
            step={5}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            color="primary"
            onChange={handleInputChange}
            onBlur={handleBlur}
            endAdornment={<InputAdornment position="end">초</InputAdornment>}
            inputProps={{
              step: 1,
              min: 0,
              max: 60,
              type: 'number',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RangeSlider;
