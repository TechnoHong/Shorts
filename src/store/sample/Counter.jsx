import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import { decrement, fetchAsync, increment } from '../sampleSlice';

export const Counter = () => {
  const { value, loading } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const fetchDelay = async () => {
    try {
      await dispatch(fetchAsync());
    } catch (e) {
      console.log('error');
    }
  };

  return (
    <Box
      sx={{
        border: '1px dashed grey',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px',
        padding: '10px',
      }}
    >
      <Button variant="contained" onClick={() => fetchDelay()}>
        Async TEST
      </Button>
      <Button variant="contained" onClick={() => dispatch(increment())}>
        증가
      </Button>
      <Typography>{value}</Typography>
      <Button variant="contained" onClick={() => dispatch(decrement())}>
        감소
      </Button>
      {loading === 'pending' && <LinearProgress sx={{ width: '100%' }} />}
    </Box>
  );
};
