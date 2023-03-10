import React, { useState } from 'react';
import { ContentsWrapper } from '../../components/ContentsWrapper';
import DownloadItem from './DownloadItem';
import Grid from '@mui/material/Grid';
import ShortsPreviewDialog from './ShortsPreviewDialog';

const ShortsDownload = () => {
  const [dialogState, setDialogState] = useState(false);

  const handleClickOpen = () => {
    console.log('dialog opened');
    setDialogState(true);
  };

  const handleClose = () => {
    console.log('dialog closed');
    setDialogState(false);
  };

  return (
    <ContentsWrapper maxWidth="xl">
      <Grid container justifyContent="center" spacing={5}>
        {Array.from(Array(10)).map((_, index) => (
          <DownloadItem key={index} handleClick={handleClickOpen} />
        ))}
      </Grid>
      <ShortsPreviewDialog onClose={handleClose} open={dialogState} />
    </ContentsWrapper>
  );
};

export default ShortsDownload;
