import React from 'react';
import {Box, Fade, Typography} from '@mui/material';
import {useTranslation} from "react-i18next";

const MainDescription = () => {
  const { t } = useTranslation(['page']);

  return (
    <Box
      sx={{
        width: '100%',
        padding: '0.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: {
          xs: 'center',
          sm: 'center',
          md: 'start',
        },
        flexDirection: 'column',
        gap: '0.25rem',
        flexWrap: 'wrap',
      }}
    >
      <Fade in timeout={500} style={{ transitionDelay: '0ms' }}>
        <Typography style={{ fontSize: '1rem', fontWeight: 500 }}>{t('main.mainDesc1')}</Typography>
      </Fade>
      <Fade in timeout={500} style={{ transitionDelay: '300ms' }}>
        <Typography sx={{
          display: {
            xs: 'none',
            sm: 'none',
            md: 'block',
          }
        }} style={{ fontSize: '0.825rem'}}>{t('main.mainDesc2')}</Typography>
      </Fade>
    </Box>
  );
};

export default MainDescription;
