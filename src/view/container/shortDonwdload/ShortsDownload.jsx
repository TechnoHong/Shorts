import React from 'react';
import { ContentsWrapper } from '../../components/ContentsWrapper';
import DownloadItem from './DownloadItem';
import Grid from '@mui/material/Grid';

const ShortsDownload = () => {
  return (
    <ContentsWrapper maxWidth="lg">
      <Grid container justifyContent="center" spacing={5}>
        {Array.from(Array(10)).map((_, index) => (
          <DownloadItem key={index} />
        ))}
      </Grid>
    </ContentsWrapper>
  );
};

export default ShortsDownload;
