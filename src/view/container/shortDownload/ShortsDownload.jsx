import React, { useState } from 'react';
import { ContentsWrapper } from '../../components/ContentsWrapper';
import DownloadItem from './DownloadItem';
import Grid from '@mui/material/Grid';
import ShortsPreviewDialog from './ShortsPreviewDialog';
import { Button, Container, Fab, styled, Typography } from '@mui/material';
import { Download } from '@mui/icons-material';

const ShortsDownload = () => {
  const [dialogState, setDialogState] = useState(false);
  const [selected, setSelected] = useState(0);

  const handleClickOpen = () => {
    console.log('dialog opened');
    setDialogState(true);
  };

  const handleClose = () => {
    console.log('dialog closed');
    setDialogState(false);
  };

  return (
    <ContentsWrapper maxWidth={false}>
      <HeadContainer
        maxWidth="lg"
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
          },
        }}
      >
        <Typography>Hello</Typography>
        <Button>download</Button>
      </HeadContainer>
      <Grid container justifyContent="center" spacing={5}>
        {Array.from(Array(10)).map((_, index) => (
          <DownloadItem key={index} handleClick={handleClickOpen} />
        ))}
      </Grid>
      <ShortsPreviewDialog onClose={handleClose} open={dialogState} />
      <Fab color="primary" sx={fabStyle} size="medium">
        <Download />
      </Fab>
    </ContentsWrapper>
  );
};

const fabStyle = {
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
};

const HeadContainer = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  width: '100%',
  display: 'flex',
  padding: '2rem',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export default ShortsDownload;
