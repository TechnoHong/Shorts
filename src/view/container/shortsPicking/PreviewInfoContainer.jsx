import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const PreviewInfoContainer = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>More Info.</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body2">Title info</Typography>
        <Typography variant="body2">Uploader info (subscriber 10M)</Typography>
        <Typography variant="body2">Uploader date - info</Typography>
        <Typography variant="body2">View - info</Typography>
        <Typography variant="body2">URL - info</Typography>
        <Typography variant="body2">#tag #tag #tag</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default PreviewInfoContainer;
