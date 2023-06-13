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
        width: '100%',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
      }}
    >
      {stringTokenizer(description).map((token, index) => (
        <Fade
          in
          timeout={500}
          style={{ transitionDelay: `${index * 120}ms` }}
          key={token + index}
        >
          <MainTypography
            gradient={undefined}
          >
            {token}
          </MainTypography>
        </Fade>
      ))}
    </Box>
  );
};

const MainTypography = styled(Typography)(({ theme, gradient }) => ({
  ...theme.components.MuiTypography,
  fontSize: '1.5rem',
  background: gradient && theme.palette.background.homeTypoGradient,
  backgroundClip: gradient && 'text',
  WebkitBackgroundClip: gradient && 'text',
  color: gradient ? 'transparent' : theme.palette.text.mainDescription,
}));

MainDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default MainDescription;
