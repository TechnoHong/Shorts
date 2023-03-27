import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import PropTypes from 'prop-types';

const PreviewInfoContainer = ({
  title,
  uploader,
  subscribers,
  uploadDate,
  url,
  tag,
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>More Info.</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2">Title {title}</Typography>
        <Typography variant="body2">
          Uploader {uploader} (subscriber {subscribers})
        </Typography>
        <Typography variant="body2">Uploader date - {uploadDate}</Typography>
        <Typography variant="body2">URL {url}</Typography>
        {tag && <Typography variant="body2">{tag}</Typography>}
      </AccordionDetails>
    </Accordion>
  );
};

PreviewInfoContainer.propTypes = {
  title: PropTypes.string,
  uploader: PropTypes.string,
  subscribers: PropTypes.string,
  uploadDate: PropTypes.string,
  url: PropTypes.string,
  tag: PropTypes.string,
};

export default PreviewInfoContainer;
