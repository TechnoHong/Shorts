import React from 'react';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { Download } from '@mui/icons-material';
import SampleImg from '../../../assets/images/mock/sample.jpg';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';

const DownloadItem = (props) => {
  const { handleClick } = props;
  return (
    <Grid item>
      <ImageListItem
        sx={{
          maxWidth: '20rem',
          transform: 'scale(1.0)',
          transition: 'transform .5s',
          ':hover': {
            transform: 'scale(1.1)',
            transition: 'transform .5s',
            cursor: 'pointer',
          },
        }}
      >
        <img
          src={SampleImg}
          alt="sample_img"
          loading="lazy"
          onClick={handleClick}
        />
        <ImageListItemBar
          title="title"
          subtitle="sub title"
          actionIcon={
            <IconButton>
              <Download color="primary" />
            </IconButton>
          }
        />
      </ImageListItem>
    </Grid>
  );
};

DownloadItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default DownloadItem;
