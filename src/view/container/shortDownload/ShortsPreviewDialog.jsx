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
import { useTranslation } from 'react-i18next';
import VideoPreview from '../../components/VideoPreview';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShortsPreviewDialog = (props) => {
  const { onClose, open } = props;
  const { t } = useTranslation(['page']);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionComponent={Transition}
      maxWidth="xl"
    >
      <DialogTitle>{t('shortsDownload.preview')}</DialogTitle>
      <DialogContent>
        <VideoPreview
          isAutoPlay={true}
          ytURL={'https://www.youtube.com/watch?v=WFsAon_TWPQ'}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('shortsDownload.close')}</Button>
      </DialogActions>
    </Dialog>
  );
};

ShortsPreviewDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ShortsPreviewDialog;
