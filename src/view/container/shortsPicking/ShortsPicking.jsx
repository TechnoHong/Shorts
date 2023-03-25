import React from 'react';
import {
  Container,
  Divider,
  Paper,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ContentsWrapper } from '../../components/ContentsWrapper';
import PickingCandi from './PickingCandi';
import VideoPreview from '../../components/VideoPreview';
import PreviewInfoContainer from './PreviewInfoContainer';

function ShortsPicking() {
  const { t } = useTranslation(['page']);

  return (
    <ContentsWrapper disableGutters maxWidth={false} sx={{ padding: '0' }}>
      <PickingTitle align="center">{t('picking.mainDescription')}</PickingTitle>
      <MainContainer
        disableGutters
        maxWidth={false}
        sx={{
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
          },
          padding: {
            md: '0',
            lg: '0 5rem',
          },
        }}
      >
        <PreviewPaper
          sx={{
            minWidth: {
              xs: '100%',
              sm: '100%',
              md: '100%',
              lg: '50%',
            },
            borderRadius: {
              xs: '0',
              sm: '0',
              md: '0',
              lg: '0.5rem',
            },
          }}
        >
          <PreviewTitle align="left">
            {t('shortsDownload.preview')}
          </PreviewTitle>
          <div
            style={{
              position: 'relative',
              paddingTop: '56.25%' /* 720 / 1280 = 0.5625 */,
            }}
          >
            <VideoPreview
              isAutoPlay={false}
              ytURL={'https://www.youtube.com/watch?v=WFsAon_TWPQ'}
            />
          </div>
          <PreviewInfoContainer />
        </PreviewPaper>
        <PickingContainer disableGutters>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="flex-end"
            spacing={2}
          >

          </Stack>
          <PickingCandi description={t('picking.candiBrief')} />
        </PickingContainer>
      </MainContainer>
    </ContentsWrapper>
  );
}
const PickingContainer = styled(Container)(({ theme }) => ({
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
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  gap: '2rem',
  paddingBottom: '1.5rem',
  background: theme.palette.primary.light,
}));

const PreviewPaper = styled(Paper)(({ theme }) => ({
  ...theme.components.MuiPaper,
  position: 'static',
  top: '1rem',
  zIndex: '99',
  background: theme.palette.grey['900'],
}));

const PickingTitle = styled(Typography)(({ theme }) => ({
  ...theme.components.MuiTypography,
  width: '100%',
  padding: '2rem',
  background: theme.palette.primary.light,
}));

const PreviewTitle = styled(Typography)(({ theme }) => ({
  ...theme.components.MuiTypography,
  color: theme.palette.primary.light,
  padding: '0.5rem 1rem',
}));

export default ShortsPicking;
