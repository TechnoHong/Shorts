import React, { useEffect, useState } from 'react';
import {
  Container,
  Stack,
  styled,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ContentsWrapper } from '../../components/ContentsWrapper';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../../hooks/useAlert';

import axios from 'axios';
import ShortsItem from "./ShortsItem";
import PreviewContainer from "./PreviewContainer";
import Header from "./Header";
import {changeEndTime, changeRatio, changeStartTime} from "../../../controllers/editSlice";

function ShortsPicking() {
  const { t } = useTranslation(['page']);
  const scrapRet = useSelector((state) => state.ytInfo.info.success);
  const ytInfo = useSelector((state) => state.ytInfo.info.result);
  const editInfo = useSelector((state) => state.edit);
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

  const getShorts = async (startTime, endTime, option = 'fullWidth') => {
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/yt_download/?url=${ytInfo.url}&&start_time=${startTime}&end_time=${endTime}&option=${option}`,
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
    getShorts(editInfo.startTime, editInfo.endTime, editInfo.ratio).then(() => {
      alert.show('success', '다운로드 완료');
    })
  }

  return (
    <ContentsWrapper disableGutters maxWidth={false} sx={{ padding: '0' }}>
      <MainContainer
        disableGutters
        maxWidth={false}
        sx={{
          flexDirection: 'column',
        }}>
        <Header onClickDownload={handleDownload}/>
        <PickingContainer
          disableGutters
          maxWidth={false}
          sx={{
            flexDirection: {
              xs: 'column-reverse',
              sm: 'column-reverse',
              md: 'row',
            },
          }}
        >
          <Stack spacing={2}>
            {
              ytInfo.mr_info.map((item, index) => (
                <ShortsItem
                  key={index}
                  info={item}
                  index={index}
                  moveYt={moveYt}
                  onChangeStartTime={onChangeStartTime}
                  onChangeEndTime={onChangeEndTime}
                />
              ))
            }
          </Stack>
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
