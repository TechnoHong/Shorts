import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ContentsWrapper } from '../../components/ContentsWrapper';
import { useTranslation } from 'react-i18next';
import { Container, Divider, styled } from '@mui/material';
import RangeSlider from './RangeSlider';
import ShortsAmountSelector from './ShortsAmountSelector';
import { Send } from '@mui/icons-material';
import StepDescription from './StepDescription';
import MainDescription from './MainDescription';
import { useState } from 'react';
import GuideContainer from './GuideContainer';
import lottieData1 from '../../../assets/images/lotties/youtube-content.json';
import lottieData2 from '../../../assets/images/lotties/video-editting.json';
import { action } from '../../../api/YoutubeAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { t } = useTranslation(['page']);
  const [ytURL, setYtURL] = useState('');
  const [range, setRange] = useState(60);
  const [count, setCount] = useState(5);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePickingButton = () => {
    dispatch(action.getYtInfo({ ytURL, count }))
      .unwrap()
      .then(() => {
        navigate('/shortspicking');
      });
  };

  return (
    <ContentsWrapper
      disableGutters
      maxWidth={false}
      sx={{ padding: '0 0 1.5rem' }}
    >
      <MainContainer
        disableGutters
        maxWidth={false}
        sx={{
          display: 'flex',
          gap: '3rem',
          alignItems: 'center',
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
          },
          padding: { md: '0', lg: '7rem' },
        }}
      >
        <MainDescription description={t('main.mainDescription')} />
        <SearchContainer
          disableGutters
          maxWidth="md"
          sx={{
            borderRadius: { md: 'none', lg: '30px' },
          }}
        >
          <StepDescription step="1." description={t('main.stepDescription1')} />
          <TextField
            id="url-text-field"
            placeholder={t('main.searchLabel')}
            variant="filled"
            sx={{ minWidth: '80%' }}
            value={ytURL}
            onChange={(e) => setYtURL(e.target.value)}
          />
          <Divider flexItem />
          <StepDescription step="2." description={t('main.stepDescription2')} />
          <RangeSlider range={range} setRange={setRange} />
          <ShortsAmountSelector count={count} setCount={setCount} />
          <Divider flexItem />
          <StepDescription step="3." description={t('main.stepDescription3')} />
          <Button
            disableElevation
            fullWidth
            variant="contained"
            sx={{ fontSize: '1.5rem', textTransform: 'none' }}
            endIcon={<Send />}
            onClick={handlePickingButton}
          >
            Picking
          </Button>
        </SearchContainer>
      </MainContainer>

      <SubContainer maxWidth={false}>
        <GuideContainer
          title={t('main.guideTitle1')}
          desc={t('main.guideDesc1')}
          animationData={lottieData1}
        />
        <GuideContainer
          title={t('main.guideTitle2')}
          desc={t('main.guideDesc2')}
          animationData={lottieData2}
          reverse={true}
        />
      </SubContainer>
    </ContentsWrapper>
  );
}

const SearchContainer = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  alignItems: 'center',
  gap: '1rem',
  background: theme.palette.background.homeSearchContainer,
}));

const MainContainer = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  background: theme.palette.background.homeMainContainer,
}));

const SubContainer = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  background: theme.palette.background.homeSubContainer,
  padding: '2rem',
}));

export default Home;
