import React, { useRef } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

const VideoPreview = ({ ytURL, isAutoPlay }) => {
  // need handling exception
  const playerRef = useRef(null);

  return (
    <ReactPlayer
      style={{
        position: 'absolute',
        left: '0',
        top: '0',
      }}
      url={ytURL}
      ref={playerRef}
      playing={isAutoPlay}
      muted={isAutoPlay}
      controls
      pip
      width="100%"
      height="100%"
      config={{
        youtube: { playerVars: { origin: 'https://youtu.be' } },
      }}
    />
  );
};

VideoPreview.propTypes = {
  ytURL: PropTypes.string.isRequired,
  isAutoPlay: PropTypes.bool.isRequired,
};

export default VideoPreview;
