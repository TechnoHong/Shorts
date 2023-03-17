import React from 'react';
import { Box, Grid, Input, InputAdornment, Slider } from '@mui/material';
import PropTypes from 'prop-types';

const RangeSlider = ({ range, setRange }) => {
  const handleSliderChange = (event, newValue) => {
    setRange(newValue);
  };

  const handleInputChange = (event) => {
    setRange(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (range < 0) {
      setRange(0);
    } else if (range > 60) {
      setRange(60);
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
            defaultValue={range}
            value={typeof range === 'number' ? range : 0}
            onChange={handleSliderChange}
            min={0}
            max={60}
            marks
            step={5}
          />
        </Grid>
        <Grid item>
          <Input
            value={range}
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

RangeSlider.propTypes = {
  range: PropTypes.number.isRequired,
  setRange: PropTypes.func.isRequired,
};

export default RangeSlider;
