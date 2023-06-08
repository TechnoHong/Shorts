import React, {useState} from 'react';
import {Backdrop, Button, CircularProgress, Paper, Stack} from "@mui/material";
import TimeField from "../../components/TimeField";
import {useTranslation} from "react-i18next";
import {Download, PlayArrowRounded} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

const TimeRangeContainer = ({ startTime, endTime, moveYt, onChangeStartTime, onChangeEndTime, getShorts }) => {
  const { t } = useTranslation(['page']);
  const [loading, setLoading] = useState(false)

  const onPlayYt = (startTime) => {
    moveYt(startTime)
  }

  const handleDownload = (startTime, endTime) => {
    setLoading(true);
    getShorts(startTime, endTime).then(() => setLoading(false));
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <Stack
        justifyContent='center'
        alignItems='center'
        sx={{ flexDirection: {
          sm: 'row',
          xs: 'column',
        }}}>
        <TimeField
          timestamp={startTime}
          onChange={onChangeStartTime}
        />
        <Typography variant="body1">-</Typography>
        <TimeField
          timestamp={endTime}
          onChange={onChangeEndTime}
        />
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
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </Paper>
  );
};

export default TimeRangeContainer;
