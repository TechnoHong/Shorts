import React from 'react';
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const RatioSelector = ({ ratio, handleChangeRatio }) => {

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Ratio</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={ratio}
        label="Ratio"
        onChange={handleChangeRatio}
      >
        <MenuItem value={'crop'}>1:1</MenuItem>
        <MenuItem value={'fullWidth'}>16:9</MenuItem>
      </Select>
    </FormControl>
  );
};

export default RatioSelector;
