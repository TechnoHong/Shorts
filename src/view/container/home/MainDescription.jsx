import React from 'react';
import { Box, Fade, styled } from '@mui/material';
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
          style={{ transitionDelay: `${index * 300}ms` }}
          key={token + index}
        >
          <DescriptionTypo>{token}</DescriptionTypo>
        </Fade>
      ))}
    </Box>
  );
};

const DescriptionTypo = styled(Typography)(({ theme }) => ({
  ...theme.components.MuiTypography,
  fontWeight: 700,
  fontSize: '2.5rem',
  lineHeight: 1.167,
  letterSpacing: '0rem',
  color: theme.palette.primary.light,
  fontFamily: 'Roboto',
}));

MainDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default MainDescription;
