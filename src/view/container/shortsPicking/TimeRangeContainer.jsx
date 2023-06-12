import React, {useState} from 'react';
import {Backdrop, Button, CircularProgress, Paper, Stack} from "@mui/material";
import TimeField from "../../components/TimeField";
import {useTranslation} from "react-i18next";
import {Download, PlayArrowRounded} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import LoadingBackdrop from "./LoadingBackdrop";
import {convertToTime} from "../../../utils/utils";
import {useAlert} from "../../../hooks/useAlert";

const TimeRangeContainer = ({ startTime, endTime, moveYt, onChangeStartTime, onChangeEndTime, getShorts }) => {
  const { t } = useTranslation(['page']);
  const [loading, setLoading] = useState(false)
  const alert = useAlert();

  const onPlayYt = (startTime) => {
    moveYt(startTime)
  }

  const handleDownload = (startTime, endTime) => {
    if( startTime >= endTime ){
        alert.show('info','종료시간이 시작시간보다 큽니다. 시간을 변경해 주세요');
        return;
    }
      setLoading(true);
      getShorts(startTime, endTime).then(() => setLoading(false));
  };

  return (
    <Paper sx={{ width: '100%', position: 'relative' }}>
      <Stack
        padding={2}
        justifyContent='center'
        alignItems='center'
        sx={{ flexDirection: {
          sm: 'row',
          xs: 'column',
          },
          gap: '1rem',
        }}>
        <Stack direction='column' alignItems='center'>
          <Typography variant='body2'>START</Typography>
          <TimeField
            timestamp={startTime}
            onChange={onChangeStartTime}
          />
        </Stack>
        <Typography variant="body1">-</Typography>
        <Stack direction='column' alignItems='center'>
          <Typography variant='body2'>END</Typography>
          <TimeField
            timestamp={endTime}
            onChange={onChangeEndTime}
          />
        </Stack>
      </Stack>
      <Stack
        direction='row'
        justifyContent='space-evenly'
      >
        <Button onClick={() => onPlayYt(startTime)} fullWidth sx={{ flexDirection: 'column' }}>
          <PlayArrowRounded/>
          미리보기
        </Button>
        <Button onClick={() => handleDownload(startTime, endTime)} fullWidth sx={{ flexDirection: 'column' }}>
          <Download/>
          다운로드
        </Button>
      </Stack>
      <LoadingBackdrop loading={loading}/>
    </Paper>
  );
};

export default TimeRangeContainer;
