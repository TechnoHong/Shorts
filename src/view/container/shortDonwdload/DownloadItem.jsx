import React from 'react';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { Download } from '@mui/icons-material';
import SampleImg from '../../../assets/images/mock/sample.jpg';
import Grid from '@mui/material/Grid';

const DownloadItem = () => {
  return (
    <Grid item>
      <ImageListItem
        sx={{
          maxWidth: '20rem',
        }}
      >
        <img src={SampleImg} alt="kkang" loading="lazy" />
        <ImageListItemBar
          title="title"
          subtitle="sub title"
          actionIcon={
            <IconButton sx={{ color: `rgba(255, 255, 255, 0.54` }}>
              <Download color="primary" />
            </IconButton>
          }
        />
      </ImageListItem>
    </Grid>
  );
};

export default DownloadItem;
