import React, { useEffect, useState } from 'react';
import {
  Container,
  styled,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ContentsWrapper } from '../../components/ContentsWrapper';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../../hooks/useAlert';

import axios from 'axios';
import PreviewContainer from "./PreviewContainer";
import Header from "./Header";
import {changeEndTime, changeRatio, changeStartTime} from "../../../controllers/editSlice";
import RecommendedContainer from "./RecommendedContainer";
import CoupangBanner from "../home/CoupangBanner";
import {appendHistory, completeDownload, failedDownload} from "../../../controllers/downloadSlice";

function ShortsPicking() {
  const { t } = useTranslation(['page']);
  const scrapRet = useSelector((state) => state.ytInfo.info.success);
  const ytInfo = useSelector((state) => state.ytInfo.info.result);
  const editInfo = useSelector((state) => state.edit);
  const downloadHistories = useSelector((state) => state.download);
  const navigate = useNavigate();
  const alert = useAlert();
  const [timeStamp, setTimeStamp] = useState(0);
  const dispatch = useDispatch();

  function handleVideoResponse(response) {
    const blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    const blobUrl = URL.createObjectURL(blob);

    // 비디오 다운로드 링크 생성
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = '#shorts ' + ytInfo.title + '.mp4';

    // 다운로드 링크 클릭 (다운로드 시작)
    downloadLink.click();

    dispatch(completeDownload(response.config.url))
    alert.show('success', t('message.alert_download_success'));

    return response
  }

  function handleVideoError(error) {
    dispatch(failedDownload(error.config.url))
    alert.show('error', error.message);
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

  const getShorts = async (startTime, endTime, option = 'fullWidth') => {
    const requestUrl = `/yt_download/?url=${ytInfo.url}&&start_time=${startTime}&end_time=${endTime}&option=${option}`

    if (downloadHistories.find((item) => item.url === requestUrl && item.status !== 'failed') ) {
      alert.show('info', t('message.alert_download_dup'))
      return
    }

    dispatch(appendHistory({ url: requestUrl, title: ytInfo.title, startTime: startTime, endTime: endTime, option: option }))

    return await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}${requestUrl}`,
      responseType: 'blob',
    })
      .then(handleVideoResponse)
      .catch(handleVideoError);
  };

  const onChangeStartTime = (time) => {
    dispatch(changeStartTime(time))
  }

  const onChangeEndTime = (time) => {
    dispatch(changeEndTime(time))
  }

  const handleChangeRatio = (event) => {
    dispatch(changeRatio(event.target.value))
  };

  const handleDownload = () => {
    if ( editInfo.endTime - editInfo.startTime > 0 && editInfo.endTime - editInfo.startTime <= 60000 ) {
      alert.show('info', t('message.alert_download_start'))
      getShorts(editInfo.startTime, editInfo.endTime, editInfo.ratio)
    } else {
      alert.show('error', t('message.alert_time_range'))
    }
  }

  return (
    <ContentsWrapper disableGutters maxWidth={false} sx={{ padding: '0' }}>
      <MainContainer
        disableGutters
        maxWidth='lg'
        sx={{
          flexDirection: 'column',
        }}>
        <Header onClickDownload={handleDownload} badge={downloadHistories.length}/>
        <CoupangBanner/>
        <PickingContainer
          disableGutters
          maxWidth={false}
          sx={{
            flexDirection: {
              xs: 'column-reverse',
              sm: 'column-reverse',
              md: 'row',
            },
            padding: {
              xs: '0.5rem',
              sm: '0.5rem',
              md: '1rem',
            }
          }}
        >
          {
            ytInfo.mr_info && (
              <RecommendedContainer
                ytInfo={ytInfo}
                moveYt={moveYt}
                onChangeStartTime={onChangeStartTime}
                onChangeEndTime={onChangeEndTime}
              />
            )
          }
          <PreviewContainer
            ytInfo={ytInfo}
            timeStamp={timeStamp}
            handleChangeRatio={handleChangeRatio}
            onChangeStartTime={onChangeStartTime}
            onChangeEndTime={onChangeEndTime}
          />
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
  gap: '1rem',
  background: theme.palette.background.halfOpacity,
}));

const MainContainer = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  paddingBottom: '1.5rem',
  background: theme.palette.primary.main,
}));

export default ShortsPicking;
