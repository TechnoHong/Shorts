import React, {useRef} from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

const VideoPreview = ({ ytURL, isAutoPlay, timestamp, handleClick }) => {
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
      onProgress={(state) => {
          // update the timestamp state with the current timestamp value
          handleClick(state.playedSeconds);
      }}
      playing={isAutoPlay}
      muted={isAutoPlay}
      controls
      pip
      width="100%"
      height="100%"
      config={{
        youtube: { playerVars: { origin: 'https://www.youtube.com' } },
      }}
    />

  );
};

VideoPreview.propTypes = {
    ytURL: PropTypes.string.isRequired,
    isAutoPlay: PropTypes.bool.isRequired,
    timestamp :  PropTypes.string.isRequired,
    handleClick : PropTypes.func.isRequired,
};

export default VideoPreview;
