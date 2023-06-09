import React, {useCallback} from 'react';
import {Button, Divider, Paper, Stack, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {Download, PlayArrowRounded} from "@mui/icons-material";
import {convertToTime} from "../../../utils/utils";
import LoadingBackdrop from "./LoadingBackdrop";

const ShortsItem = ({ info, index, moveYt, getShorts, onChangeStartTime, onChangeEndTime }) => {
  const { t } = useTranslation(['page']);
  const [loading, setLoading] = React.useState(false);

  const handleClick = useCallback(
    (item) => {
      moveYt(item.start_time);
      onChangeStartTime(item.start_time)
      onChangeEndTime(item.end_time)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [moveYt],
  );

  const handleDownload = (startTime, endTime) => {
    setLoading(true);
    getShorts(startTime, endTime).then(() => setLoading(false));
  };

  const getTimeStr = (millis) => {
    const time = convertToTime(millis)
    return `${time.hours}:${time.minutes}:${time.seconds}`
  }

  return (
    <Item>
      <Stack direction='row' alignItems='end' spacing={2} padding={2}>
        <Typography variant="h5" textAlign='start'>{`#${index + 1}`}</Typography>
        <Typography variant="body2" textAlign='start'>{`${getTimeStr(info.start_time)} - ${getTimeStr(info.end_time)}`}</Typography>
      </Stack>
      <Stack
        direction='row'
        justifyContent='space-evenly'
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Button onClick={() => handleClick(info)} fullWidth sx={{ flexDirection: 'column' }}>
          <PlayArrowRounded/>
          미리보기
        </Button>
        <Button onClick={() => handleDownload(info.start_time, info.end_time)} fullWidth sx={{ flexDirection: 'column' }}>
          <Download/>
          다운로드
        </Button>
      </Stack>
      <LoadingBackdrop loading={loading}/>
    </Item>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.primary,
  lineHeight: '60px',
  padding: '0',
  position: 'relative',
}));

export default ShortsItem;
