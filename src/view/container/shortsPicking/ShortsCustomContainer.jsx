import React, {useState} from 'react';
import {Box, Button, Container, Divider, Paper, Radio, Stack, styled} from "@mui/material";
import TimeField from "../../components/TimeField";
import {useTranslation} from "react-i18next";
import {Download, PlayArrowRounded} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import LoadingBackdrop from "./LoadingBackdrop";
import {useAlert} from "../../../hooks/useAlert";
import cropImage1 from '../../../assets/images/crop1.jpg';
import cropImage2 from '../../../assets/images/crop2.jpg';

const ShortsCustomContainer = ({ startTime, endTime, moveYt, onChangeStartTime, onChangeEndTime, getShorts }) => {
  const { t } = useTranslation(['page']);
  const [loading, setLoading] = useState(false)
  const [ratio, setRatio] = useState('fullWidth')
  const alert = useAlert();

  const onPlayYt = (startTime) => {
    moveYt(startTime)
  }

  const handleDownload = (startTime, endTime) => {
    if (startTime >= endTime) {
        alert.show('info','종료시간이 시작시간보다 큽니다. 시간을 변경해 주세요');
        return;
    }
      setLoading(true);
      getShorts(startTime, endTime, ratio).then(() => setLoading(false));
  };

  const handleChangeRatioOption = (option) => {
    setRatio(option)
  }

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
      <Divider orientation="horizontal" flexItem />
      <SelectRatioContainer initValue={ratio} handleChange={handleChangeRatioOption}/>
      <Divider orientation="horizontal" flexItem />
      <Stack
        direction='row'
        justifyContent='space-evenly'
        divider={<Divider orientation="vertical" flexItem/>}
      >
        <Button onClick={() => onPlayYt(startTime)} fullWidth sx={{ flexDirection: 'column' }}>
          <PlayArrowRounded/>
            {t('shortsDownload.preview')}
        </Button>
        <Button onClick={() => handleDownload(startTime, endTime)} fullWidth sx={{ flexDirection: 'column' }}>
          <Download/>
            {t('tips.btn_download')}
        </Button>
      </Stack>
      <LoadingBackdrop loading={loading}/>
    </Paper>
  );
};

const SelectRatioContainer = ({ initValue, handleChange }) => {
  const [selected, setSelected] = useState(initValue)
  const onClickItem = (option) => {
    handleChange(option)
    setSelected(option)
  }

  return (
    <SelectRatioWrapper>
      <Typography variant="body1" align='center'>비율 선택</Typography>
      <RatioItemsWrapper direction='row' justifyContent='center' divider={<Divider orientation="vertical" flexItem />}>
        <SelectRatioItem title='원본 비율 유지' image={cropImage1} handleClick={() => onClickItem('fullWidth')} isSelected={selected === 'fullWidth'}/>
        <SelectRatioItem title='확대' image={cropImage2} handleClick={() => onClickItem('crop')} isSelected={selected === 'crop'}/>
      </RatioItemsWrapper>
    </SelectRatioWrapper>
  )
}

const SelectRatioItem = ({ title, image, handleClick, isSelected }) => {
  return (
    <RatioItem onClick={handleClick}>
      <img width='100%' src={image} alt='cropImage'/>
      <Typography variant="body2" align='center'>{title}</Typography>
      <Radio sx={{ alignSelf: 'center' }} checked={isSelected}/>
    </RatioItem>
  )
}

const SelectRatioWrapper = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  alignItems: 'stretch',
  justifyContent: 'center',
  gap: '1rem',
}));

const RatioItemsWrapper = styled(Stack)(({ theme }) => ({
  ...theme.components.MuiStack,
  padding: '1rem',
  gap: '1rem',
  background: 'transparent',
}));

const RatioItem = styled(Paper)(({ theme }) => ({
  ...theme.components.MuiPaper,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '2rem',
  cursor: 'pointer',
  [`&:hover`]: {
    background: theme.palette.primary.light,
  }
}));

export default ShortsCustomContainer;
