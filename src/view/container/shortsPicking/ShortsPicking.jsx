import React, { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../../hooks/useAlert';

import axios from "axios";

function ShortsPicking() {
  const { t } = useTranslation(['page']);
  const scrapRet = useSelector((state) => state.ytInfo.info.success);
  const ytInfo = useSelector((state) => state.ytInfo.info.result);
  const navigate = useNavigate();
  const alert = useAlert();
  const [timeStamp, setTimeStamp] = useState(0);

  function handleVideoResponse(response) {
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Blob URL 생성
      const blobUrl = URL.createObjectURL(blob);

      // 비디오 다운로드 링크 생성
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = 'my_video0409.mp4';

      // 다운로드 링크 클릭 (다운로드 시작)
      downloadLink.click();
  }

  function handleVideoError(error) {
    console.error(error);
  }


  useEffect(() => {
    if (scrapRet === false || ytInfo.url === '') {
      navigate('/');
      alert.show('warning', t('message.redirection'));
    }
  }, []);

  const moveYt = (timet) => {
    console.log('moveYt : ', timet);
    if (timet < 0 || timet >= ytInfo.video_length) {
      alert.show('warning', t('message.invalid_time'));
    }
    else {
      setTimeStamp(timet);
    }
  };

  const getShorts = (row) => {
    axios({
      method: 'post',
      url: `/yt_download/?url=${ytInfo.url}&user_want_time=${row.end_time - row.start_time}&start_time=${row.start_time}&end_time=${row.end_time}`,
      responseType: 'blob'
    }).then(handleVideoResponse).catch(handleVideoError);;
    console.log('Download time : ',row.start_time, ' - ',row.end_time);
  };

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
        }}
      >
        <PickingContainer
          disableGutters
          maxWidth={false}
          sx={{
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'column',
              lg: 'row',
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
                isAutoPlay={true}
                ytURL={
                  'https://youtu.be/' +
                  ytInfo.video_id +
                  '?t=' +
                  timeStamp / 1000
                }
              />
            </div>
            <PreviewInfoContainer
              title={ytInfo.title}
              uploader={ytInfo.owner.owner}
              subscribers={ytInfo.owner.owner_subscribers}
              uploadDate={ytInfo.upload_date}
              tags={ytInfo.tags}
              url={ytInfo.owner.owner_url}
              viewCount={ytInfo.view_count}
            />
          </PreviewPaper>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="flex-end"
            spacing={2}
          ></Stack>
          <PickingCandi
            infos={ytInfo.mr_info}
            moveYt={moveYt}
            getShorts={getShorts}
            description={t('picking.candiBrief')}
          />
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
