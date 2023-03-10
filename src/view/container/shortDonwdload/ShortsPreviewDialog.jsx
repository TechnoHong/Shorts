import React from 'react';
import { Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
import PropTypes from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShortsPreviewDialog = (props) => {
  const { onClose, open } = props;

  return (
    <Dialog onClose={onClose} open={open} TransitionComponent={Transition}>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogContent>hello</DialogContent>
    </Dialog>
  );
};

ShortsPreviewDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ShortsPreviewDialog;
