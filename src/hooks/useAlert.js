import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hide, show } from '../controllers/alertSlice';
import { Snackbar, Alert } from '@mui/material';

export const useAlert = () => {
  const dispatch = useDispatch();
  return {
    show: (severity, message) => {
      dispatch(show({ severity, message }));
      setTimeout(() => dispatch(hide()), 3000);
    },
  };
};

export const Alerting = () => {
  const alertState = useSelector((state) => state.alert);

  return (
    <Snackbar
      open={alertState.isVisible}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
    >
      <Alert severity={alertState.severity} sx={{ width: '100%' }}>
        {alertState.description}
      </Alert>
    </Snackbar>
  );
};
