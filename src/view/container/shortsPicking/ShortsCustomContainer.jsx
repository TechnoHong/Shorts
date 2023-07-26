import React from 'react';
import {Paper, Stack} from "@mui/material";
import TimeField from "../../components/TimeField";
import {useTranslation} from "react-i18next";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from "react-redux";
import {changeEndTime, changeStartTime} from "../../../controllers/editSlice";

const ShortsCustomContainer = () => {
  const editInfo = useSelector((state) => state.edit);
  const dispatch = useDispatch()
  const { t } = useTranslation(['page']);

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
            timestamp={editInfo.startTime}
            onChange={(time) => dispatch(changeStartTime(time))}
          />
        </Stack>
        <Typography variant="body1">-</Typography>
        <Stack direction='column' alignItems='center'>
          <Typography variant='body2'>END</Typography>
          <TimeField
            timestamp={editInfo.endTime}
            onChange={(time) => dispatch(changeEndTime(time))}
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ShortsCustomContainer;
