import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const StepDescription = ({ step, description }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        alignSelf: 'start',
        gap: '0.5rem',
      }}
    >
      <Typography variant="h6">{step}</Typography>
      {description && <Typography variant="body1">{description}</Typography>}
    </Box>
  );
};

StepDescription.propTypes = {
  step: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default StepDescription;
