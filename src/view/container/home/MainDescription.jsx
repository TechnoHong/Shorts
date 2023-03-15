import React from 'react';
import { Box, Fade } from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const MainDescription = ({ description }) => {
  const stringTokenizer = (str) => {
    return str.split(' ');
  };

  return (
    <Box
      sx={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
      }}
    >
      {stringTokenizer(description).map((token, index) => (
        <Fade
          in
          timeout={500}
          style={{ transitionDelay: `${index * 500}ms` }}
          key={token + index}
        >
          <Typography variant="h3">{token}</Typography>
        </Fade>
      ))}
    </Box>
  );
};

MainDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default MainDescription;
