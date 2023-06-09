import React from 'react';
import {Backdrop, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";

const LoadingBackdrop = ({ loading }) => {
  return (
    <Backdrop open={loading} sx={{ position: 'absolute', borderRadius: 'inherit', flexDirection: 'column' }}>
      <CircularProgress color='inherit'/>
      <Typography color='inherit'>다운로드 중 입니다.</Typography>
    </Backdrop>
  );
};

export default LoadingBackdrop;
