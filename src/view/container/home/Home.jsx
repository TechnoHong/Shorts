import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ContentsWrapper } from '../../components/ContentsWrapper';
import { useTranslation } from 'react-i18next';
import { Container, Divider, styled } from '@mui/material';
import RangeSlider from './RangeSlider';
import RangeButtonGroup from './RangeButtonGroup';
import { Send } from '@mui/icons-material';
import StepDescription from './StepDescription';
import MainDescription from './MainDescription';

function Home() {
  const { t } = useTranslation(['page']);
  return (
    <ContentsWrapper
      disableGutters
      maxWidth={false}
      sx={{ padding: '0 0 1.5rem' }}
    >
      <MainContainer disableGutters maxWidth={false}>
        <MainDescription description={t('main.mainDescription')} />
        <SearchContainer
          disableGutters
          sx={{ borderRadius: { md: 'none', lg: '30px 30px 0 0' } }}
        >
          <StepDescription step="1." description={t('main.stepDescription1')} />
          <TextField
            id="url-text-field"
            placeholder={t('main.searchLabel')}
            variant="filled"
            sx={{ minWidth: '50%' }}
          />
          <Divider flexItem />
          <StepDescription step="2." description={t('main.stepDescription2')} />
          <RangeSlider />
          <RangeButtonGroup />
          <Divider flexItem />
          <StepDescription step="3." description={t('main.stepDescription3')} />
          <Button
            disableElevation
            variant="contained"
            sx={{ fontSize: '1.5rem', textTransform: 'none' }}
            endIcon={<Send />}
          >
            Picking
          </Button>
        </SearchContainer>
      </MainContainer>

      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        marginTop="50px"
      >
        Something short and leading about the collection below—its contents, the
        creator, etc. Make it short and sweet, but not too short so folks
        don&apos;t simply skip over it entirely.
      </Typography>
    </ContentsWrapper>
  );
}

const SearchContainer = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  alignItems: 'center',
  gap: '2rem',
  background: theme.palette.background.homeSearchContainer,
}));

const MainContainer = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  background: theme.palette.background.homeMainContainer,
}));
export default Home;
