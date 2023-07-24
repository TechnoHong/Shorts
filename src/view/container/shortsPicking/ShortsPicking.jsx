import React, { useEffect, useState } from 'react';
import {
  Container,
  Stack,
  styled,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ContentsWrapper } from '../../components/ContentsWrapper';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../../hooks/useAlert';

import axios from 'axios';
import ShortsItem from "./ShortsItem";
import PreviewContainer from "./PreviewContainer";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function ShortsPicking() {
  const { t } = useTranslation(['page']);
  const scrapRet = useSelector((state) => state.ytInfo.info.success);
  const ytInfo = useSelector((state) => state.ytInfo.info.result);
  const navigate = useNavigate();
  const alert = useAlert();
  const [timeStamp, setTimeStamp] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [ratio, setRatio] = useState('fullWidth')

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
      alert.show('warning', t('message.time_error'));
    } else {
      setTimeStamp(timet);
    }
  };

  const getShorts = async (startTime, endTime, option = 'fullWidth') => { //TODO: api 파라미터 수정 후 작업
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/yt_download/?url=${ytInfo.url}&&start_time=${startTime}&end_time=${endTime}&option=${option}`,
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

  const handleChangeRatio = (event) => {
    setRatio(event.target.value);
  };

  const handleDownload = (startTime, endTime) => {
    getShorts(startTime, endTime).then(r => console.log(r, 'done'))
  }

  return (
    <ContentsWrapper disableGutters maxWidth={false} sx={{ padding: '0' }}>
      <MainContainer
        disableGutters
        maxWidth={false}
        sx={{
          flexDirection: 'column',
        }}
      >
        <Button //todo 여기 감싸서 유튜브 검색 창, 다운로드 버튼 같은 기능 버튼들 모아두기
          variant="contained"
          disableElevation
          endIcon={<KeyboardArrowRightIcon />}
          onClick={() => handleDownload(startTime, endTime)}
          color='secondary'
        >
          {t('tips.btn_download')}
        </Button>
        <PickingContainer
          disableGutters
          maxWidth={false}
          sx={{
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'row',
            },
          }}
        >
          {/*<ShortsCustomContainer*/}
          {/*  startTime={startTime}*/}
          {/*  endTime={endTime}*/}
          {/*  onChangeStartTime={onChangeStartTime}*/}
          {/*  onChangeEndTime={onChangeEndTime}*/}
          {/*  moveYt={moveYt}*/}
          {/*  getShorts={getShorts}*/}
          {/*/>*/}
          <Stack spacing={2}>
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
          <PreviewContainer ytInfo={ytInfo} timeStamp={timeStamp} handleChangeRatio={handleChangeRatio} ratio={ratio}/>
        </PickingContainer>
      </MainContainer>
    </ContentsWrapper>
  );
}
const PickingContainer = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  padding: '2rem',
  gap: '1rem',
  background: theme.palette.background.halfOpacity,
}));

const MainContainer = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  gap: '2rem',
  paddingBottom: '1.5rem',
  background: theme.palette.primary.main,
}));

export default ShortsPicking;
