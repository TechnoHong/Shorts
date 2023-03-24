import React from 'react';
import { ContentsWrapper } from '../components/ContentsWrapper';
import { styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation(['page']);

  return (
    <ContentsWrapper>
      <FstTypo
        sx={{
          fontFamily: 'Roboto',
          fontWeight: '700',
          fontSize: {
            xs: '4rem',
            sm: '7rem',
            md: '10rem',
            lg: '15rem',
            xl: '20rem',
          },
        }}
      >
        404
      </FstTypo>
      <SndTypo
        sx={{
          fontFamily: 'Roboto',
          fontWeight: '700',
          fontSize: {
            xs: '2rem',
            sm: '5rem',
            md: '7rem',
            lg: '10rem',
            xl: '13rem',
          },
        }}
      >
        NotFound
      </SndTypo>
      <TrdTypo>{t('notFound.desc')}</TrdTypo>
    </ContentsWrapper>
  );
};

const FstTypo = styled(Typography)(({ theme }) => ({
  ...theme.components.MuiTypography,
  color: theme.palette.secondary.dark,
  lineHeight: 1,
}));

const SndTypo = styled(Typography)(({ theme }) => ({
  ...theme.components.MuiTypography,
  color: theme.palette.secondary.main,
  lineHeight: 1,
}));

const TrdTypo = styled(Typography)(({ theme }) => ({
  ...theme.components.MuiTypography,
  color: theme.palette.secondary.light,
  marginTop: '1rem',
}));

export default NotFound;
