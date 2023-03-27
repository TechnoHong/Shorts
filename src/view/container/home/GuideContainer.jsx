import React from 'react';
import { Box, Container, styled, Typography } from '@mui/material';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';

const GuideContainer = ({ title, desc, animationData, reverse }) => {
  const lottieOptions = {
    loop: true,
    autoPlay: true,
    animationData: animationData,
    rerenderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <GuideBox
      maxWidth="lg"
      sx={{
        margin: '0 auto',
        width: '100%',
        flexDirection: {
          xs: 'column',
          sm: 'column',
          md: 'column',
          lg: `${reverse ? 'row-reverse' : 'row'}`,
        },
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Lottie
        options={lottieOptions}
        width="15rem"
        height="15rem"
        style={{ margin: 0 }}
      />
      <GuideDescription>
        <GuideTypo variant="h5" reverse={reverse && 'true'}>
          {title}
        </GuideTypo>
        <GuideTypo variant="body1" reverse={reverse && 'true'}>
          {desc}
        </GuideTypo>
      </GuideDescription>
    </GuideBox>
  );
};

const GuideBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '2rem',
  borderRadius: '30px',
  border: '1px solid',
  borderColor: theme.palette.primary.light,
  background: theme.palette.background.homeSearchContainer,
}));

const GuideDescription = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  flexDirection: 'column',
}));

const GuideTypo = styled(Typography)(({ theme, reverse }) => ({
  ...theme.components.MuiTypography,
  color: theme.palette.text.guide,
  alignSelf: reverse ? 'end' : 'start',
}));

GuideDescription.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  animationData: PropTypes.any,
  reverse: PropTypes.bool,
};

export default GuideContainer;
