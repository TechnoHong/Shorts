import React, { useState } from 'react';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { CheckCircle, Circle, CircleTwoTone } from '@mui/icons-material';
import SampleImg from '../../../assets/images/mock/sample.jpg';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';

const DownloadItem = (props) => {
  const { handleClick } = props;
  const [selected, setSelected] = useState(false);

  return (
    <Grid item>
      <ImageListItem
        sx={{
          maxWidth: '20rem',
        }}
      >
        <img
          src={SampleImg}
          alt="sample_img"
          loading="lazy"
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        />
        <ImageListItemBar
          title="title"
          subtitle="sub title"
          actionIcon={
            <IconButton size="large" onClick={() => setSelected(!selected)}>
              {selected ? <CheckCircle color="info" /> : <CircleTwoTone />}
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
