import * as React from 'react';
import TextField from '@mui/material/TextField';
import { ContentsWrapper } from '../../components/ContentsWrapper';
import { useTranslation } from 'react-i18next';
import {Container, Paper, styled} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MainDescription from './MainDescription';
import { useState } from 'react';
import GuideContainer from './GuideContainer';
import { action } from '../../../api/YoutubeAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useAlert } from '../../../hooks/useAlert';
import Title from "./Title";
import HomeDeco from "../../components/HomeDeco";
import YoutubeSearchBox from "./YoutubeSearchBox";
import CoupangBanner from "./CoupangBanner";

function Home() {
  const { t } = useTranslation(['page']);
  const [ytURL, setYtURL] = useState('');
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
      dispatch(action.getYtInfo({ ytURL: ytURL, count: 10, range: 30 }))
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

  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      handlePickingButton()
    }
  }

  return (
    <ContentsWrapper
      disableGutters
      maxWidth={false}
      sx={{ padding: '0 0 1.5rem' }}
    >
      <RootContainer  sx={{
        flexDirection: {
          xs: 'column',
          sm: 'column',
          md: 'row',
        }
      }}>
        <MainContainer
          disableGutters
          maxWidth={false}
          sx={{
            display: 'flex',
            gap: '1rem',
            alignItems: {
              xs: 'center',
              sm: 'center',
              md: 'start',
            },
            flexDirection: 'column',
            padding: {
              xs: '2rem',
              sm: '2rem',
              md: '2rem 2rem 12rem',
            },
          }}
        >
          <Title/>
          <MainDescription />
          <SearchContainer
            disableGutters
            sx={{
              alignItems: {
                sm: 'center',
                md: 'start',
              },
            }}
          >
            <TextField
              error={isEmptyInput}
              id="url-text-field"
              placeholder={t('main.searchLabel')}
              variant="outlined"
              color='secondary'
              sx={{ minWidth: '80%' }}
              value={ytURL}
              onChange={(e) => {
                setIsEmptyInput(false);
                setYtURL(e.target.value);
              }}
              onKeyUp={onPressEnter}
            />
            <LoadingButton
              loading={loading && true}
              variant="outlined"
              endIcon={<KeyboardArrowRightIcon />}
              onClick={handlePickingButton}
              color='secondary'
            >
              Picking
            </LoadingButton>
          </SearchContainer>
        </MainContainer>

        <SubContainer elevation={0}>
          <GuideContainer
            title={t('main.guideTitle1')}
            desc={t('main.guideDesc1')}
          />
          <GuideContainer
            title={t('main.guideTitle2')}
            desc={t('main.guideDesc2')}
          />
          <GuideContainer
            title={t('main.guideTitle3')}
            desc={t('main.guideDesc3')}
          />
          <YoutubeSearchBox/>
          <CoupangBanner/>
          <GuideContainer
            title={t('main.guideTitle4')}
            desc={t('main.guideDesc4')}
          />
          <HomeDeco />
        </SubContainer>
      </RootContainer>
    </ContentsWrapper>
  );
}

const SearchContainer = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  background: 'transparent',
}));

const RootContainer = styled(Paper)(({ theme }) => ({
  ...theme.components.MuiPaper,
  display: 'flex',
  alignItems: 'center',
  width: 'inherit',
  minHeight: `calc(100vh - 3rem)`,
}))

const MainContainer = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
}));

const SubContainer = styled(Paper)(({ theme }) => ({
  ...theme.components.MuiPaper,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '2rem',
  background: theme.palette.background.subContainer,
  borderRadius: '0',
  position: 'relative',
}));

export default Home;
