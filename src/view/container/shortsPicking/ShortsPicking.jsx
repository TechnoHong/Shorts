import React, { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ContentsWrapper } from '../../components/ContentsWrapper';
import VideoPreview from '../../components/VideoPreview';
import PreviewInfoContainer from './PreviewInfoContainer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../../hooks/useAlert';

import axios from 'axios';
import ShortsItem from "./ShortsItem";
import TimeRangeContainer from "./TimeRangeContainer";

function ShortsPicking() {
  const { t } = useTranslation(['page']);
  const scrapRet = useSelector((state) => state.ytInfo.info.success);
  const ytInfo = useSelector((state) => state.ytInfo.info.result);
  const navigate = useNavigate();
  const alert = useAlert();
  const [timeStamp, setTimeStamp] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  function handleVideoResponse(response) {
    const blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    const blobUrl = URL.createObjectURL(blob);

    // 비디오 다운로드 링크 생성
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = 'shorts_' + ytInfo.title.slice(0, 10) + '.mp4';

    // 다운로드 링크 클릭 (다운로드 시작)
    downloadLink.click();
  }

  function handleVideoError(error) {
    console.error(error);
    alert.show('error', t(error.message));
  }

  useEffect(() => {
    if (scrapRet === false || ytInfo.url === '') {
      navigate('/');
      alert.show('warning', t('message.redirection'));
    }
  }, []);

  const moveYt = (timet) => {
    if (timet < 0 || timet >= ytInfo.video_length) {
      alert.show('warning', t('부적절한 영상 구간입니다. 다시 선택하세요.'));
    } else {
      setTimeStamp(timet);
    }
  };

  const getShorts = async (startTime, endTime) => {
    await axios({
      method: 'post',
      url: `http://13.209.70.218:5000/yt_download/?url=${ytInfo.url}&user_want_time=${
        endTime - startTime
      }&start_time=${startTime}&end_time=${endTime}`,
      responseType: 'blob',
    })
      .then(handleVideoResponse)
      .catch(handleVideoError);
  };

  const onChangeStartTime = (time) => {
    setStartTime(time)
  }

  const onChangeEndTime = (time) => {
    setEndTime(time)
  }

  return (
    <ContentsWrapper disableGutters maxWidth={false} sx={{ padding: '0' }}>
      <PickingTitle align="center">{t('picking.mainDescription')}</PickingTitle>
      <MainContainer
        disableGutters
        maxWidth={false}
        sx={{
          flexDirection: 'column',
        }}
      >
        <PickingContainer
          disableGutters
          maxWidth='md'
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <PreviewPaper sx={{ width: '100%' }}>
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
          <TimeRangeContainer
            startTime={startTime}
            endTime={endTime}
            onChangeStartTime={onChangeStartTime}
            onChangeEndTime={onChangeEndTime}
            moveYt={moveYt}
            getShorts={getShorts}
          />
          <Stack width='100%' spacing={2}>
            {
              ytInfo.mr_info.map((item, index) => (
                <ShortsItem
                  key={index}
                  info={item}
                  index={index}
                  moveYt={moveYt}
                  getShorts={getShorts}
                  onChangeStartTime={onChangeStartTime}
                  onChangeEndTime={onChangeEndTime}
                />
              ))
            }
          </Stack>
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
  background: theme.palette.grey['900'],
}));

const PickingTitle = styled(Typography)(({ theme }) => ({
  ...theme.components.MuiTypography,
  width: '100%',
  padding: '2rem',
  background: theme.palette.primary.light,
  fontSize: '24px',
}));

const PreviewTitle = styled(Typography)(({ theme }) => ({
  ...theme.components.MuiTypography,
  color: theme.palette.primary.light,
  padding: '0.5rem 1rem',
}));

export default ShortsPicking;
