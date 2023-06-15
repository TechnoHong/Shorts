import * as React from 'react';
import TextField from '@mui/material/TextField';
import { ContentsWrapper } from '../../components/ContentsWrapper';
import { useTranslation } from 'react-i18next';
import { Container, styled } from '@mui/material';
import { Send } from '@mui/icons-material';
import MainDescription from './MainDescription';
import { useState } from 'react';
import GuideContainer from './GuideContainer';
import lottieData1 from '../../../assets/images/lotties/youtube-content.json';
import lottieData2 from '../../../assets/images/lotties/video-editing.json';
import lottieData3 from '../../../assets/images/lotties/video-editing2.json';
import { action } from '../../../api/YoutubeAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useAlert } from '../../../hooks/useAlert';

function Home() {
  const { t } = useTranslation(['page']);
  const [ytURL, setYtURL] = useState('');
  const [range, setRange] = useState(60);
  const [count, setCount] = useState(10);
  const [isEmptyInput, setIsEmptyInput] = useState(false);

  const loading = useSelector((state) => state.ytInfo.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const handlePickingButton = () => {
    if (ytURL === '') {
      alert.show('info', t('message.empty_url'));
      setIsEmptyInput(true);
    } else {
      dispatch(action.getYtInfo({ ytURL, count, range }))
        .unwrap()
        .then(() => {
          navigate('/ShortsPicking');
        })
        .catch((error) => {
          switch (error.code) {
            case 'ERR_BAD_REQUEST':
              alert.show('error', t('message.bad_request'));
              setIsEmptyInput(true);
              break;
            default:
              alert.show('error', error.message);
          }
        });
    }
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
          flexDirection: 'column',
          padding: '0',
        }}
      >
        <MainDescription description={t('main.mainDescription')} />
        <SearchContainer
          disableGutters
          maxWidth="md"
          sx={{
            borderRadius: { md: 'none', lg: '20px 20px 0 0' },
          }}
        >
          <TextField
            error={isEmptyInput}
            id="url-text-field"
            placeholder={t('main.searchLabel')}
            variant="filled"
            sx={{ minWidth: '80%' }}
            value={ytURL}
            onChange={(e) => {
              setIsEmptyInput(false);
              setYtURL(e.target.value);
            }}
          />
          <LoadingButton
            loading={loading && true}
            disableElevation
            variant="contained"
            sx={{ fontSize: '1rem', textTransform: 'none' }}
            endIcon={<Send />}
            onClick={handlePickingButton}
          >
            Picking
          </LoadingButton>
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
        <GuideContainer
            title={t('main.guideTitle3')}
            desc={t('main.guideDesc3')}
            animationData={lottieData3}
        />
      </SubContainer>
    </ContentsWrapper>
  );
}

const SearchContainer = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  display: 'flex',
  flexDirection: 'row',
  padding: '2rem',
  alignItems: 'stretch',
  justifyContent: 'center',
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
