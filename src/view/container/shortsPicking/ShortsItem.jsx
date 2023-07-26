import React, {useCallback} from 'react';
import {Button, Paper, Stack, styled} from "@mui/material";
import Typography from "@mui/material/Typography";
import {PlayArrowRounded} from "@mui/icons-material";
import {convertToTime} from "../../../utils/utils";

const ShortsItem = ({ info, index, moveYt, onChangeStartTime, onChangeEndTime }) => {

  const handleClick = useCallback(
    (item) => {
      moveYt(item.start_time);
      onChangeStartTime(item.start_time)
      onChangeEndTime(item.end_time)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [moveYt],
  );

  const getTimeStr = (millis) => {
    const time = convertToTime(millis)
    return `${time.hours}:${time.minutes}:${time.seconds}`
  }

  return (
    <Item elevation={0} onClick={() => handleClick(info)} sx={{
      width: {
        xs: '100%',
        sm: '100%',
        md: '18rem',
      }
    }}>
      <Stack direction='row' alignItems='center' spacing={2} padding={1} justifyContent='space-between'>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Typography variant="h5" textAlign='start' sx={{ fontWeight: 700, paddingLeft: '0.5rem' }}>{`${index + 1}`}</Typography>
          <Typography variant="body2" textAlign='start'>{`${getTimeStr(info.start_time)} - ${getTimeStr(info.end_time)}`}</Typography>
        </Stack>
        <Button>
          <PlayArrowRounded color='secondary'/>
        </Button>
      </Stack>
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
  border: `1px solid ${theme.palette.primary.dark}`,
  borderRadius: '0.5rem',
  '&:hover': {
    background: theme.palette.primary.dark,
    cursor: 'pointer',
  },
}));

export default ShortsItem;
