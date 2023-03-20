import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

const VideoPreview = ({ ytURL, isAutoPlay }) => {
  return (
    <ReactPlayer
      style={{
        margin: '0 auto',
        maxWidth: '100%',
      }}
      url={ytURL}
      playing={isAutoPlay}
      muted={isAutoPlay}
      controls
      pip
      config={{
        youtube: { playerVars: { origin: 'https://www.youtube.com' } },
      }}
    />
  );
};

VideoPreview.propTypes = {
  ytURL: PropTypes.string.isRequired,
  isAutoPlay: PropTypes.bool.isRequired,
};

export default VideoPreview;
