import React from 'react';
import {Box, Container, styled, Typography} from '@mui/material';
import Lottie from 'react-lottie';
import PropTypes from 'prop-types';

const GuideContainer = ({ title, desc, animationData, reverse }) => {
  const lottieOptions = {
    loop: true,
    autoPlay: true,
    animationData,
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
      { animationData && (
        <Lottie
          options={lottieOptions}
          width="15rem"
          height="15rem"
          style={{ margin: 0 }}
        />
      )}
      <GuideDescription>
        <GuideTypo reverse={reverse && 'true'} sx={{
          fontSize: '1rem',
          fontWeight: 700,
        }}>
          {title}
        </GuideTypo>
        <GuideTypo variant="body2" reverse={reverse && 'true'} sub={'true'}>
          {desc}
        </GuideTypo>
      </GuideDescription>
    </GuideBox>
  );
};

export const GuideBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '1rem',
  borderRadius: '5px',
  border: `1px ${theme.palette.primary.dark} solid`,
  background: theme.palette.primary.main,
  zIndex: 1,
}));

export const GuideDescription = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
  flexDirection: 'column',
}));

export const GuideTypo = styled(Typography)(({ theme, reverse, sub }) => ({
  ...theme.components.MuiTypography,
  color: sub ? theme.palette.text.guide : theme.palette.text.primary,
  alignSelf: reverse ? 'end' : 'start',
}));

GuideContainer.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  animationData: PropTypes.any,
  reverse: PropTypes.bool,
};

export default GuideContainer;
