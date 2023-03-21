import React from 'react';
import { Container, Divider, Stack, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ContentsWrapper } from '../../components/ContentsWrapper';
import PickingCandi from './PickingCandi';
import Button from '@mui/material/Button';
import VideoPreview from '../../components/VideoPreview';

function ShortsPicking() {
  const { t } = useTranslation(['page']);
  // const [ScrollY, setScrollY] = useState(0);
  // const handleScroll = () => {
  //     setScrollY(window.pageYOffset);
  //     setScrollActive(true);
  //   }

  return (

    <ContentsWrapper disableGutters maxWidth={false} sx={{ padding: '0' }}>
      <MainContainer disableGutters maxWidth={false}>
        <PickingContainer
          disableGutters
          sx={{ borderRadius: { md: 'none', lg: '30px' } }}
        >
          <Typography align="center">{t('picking.mainDescription')}</Typography>
          <VideoPreview
            isAutoPlay={false}
            ytURL={'https://www.youtube.com/watch?v=WFsAon_TWPQ'}
          />
          <Divider flexItem />
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="flex-end"
            spacing={2}
          >
            <Button variant="contained">
              All Download
            </Button>
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
  minHeight: '100%',
  paddingBottom: '1.5rem',
  background: theme.palette.background.homeMainContainer,
}));
export default ShortsPicking;
