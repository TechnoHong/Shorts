import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShortsPreviewDialog = (props) => {
  const { onClose, open } = props;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionComponent={Transition}
      maxWidth="xl"
    >
      <DialogTitle>미리보기</DialogTitle>
      <DialogContent>
        <ReactPlayer
          style={{
            margin: '0 auto',
            maxWidth: '100%',
          }}
          url="https://www.youtube.com/watch?v=WFsAon_TWPQ"
          playing
          muted
          controls
          pip
          config={{
            youtube: { playerVars: { origin: 'https://www.youtube.com' } },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

ShortsPreviewDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ShortsPreviewDialog;
