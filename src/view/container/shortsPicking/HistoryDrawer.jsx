import React from 'react';
import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  styled,
  Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {getTimeStr} from "../../../utils/utils";
import {Close, Done, PriorityHigh} from "@mui/icons-material";

const HistoryDrawer = ({ handleClose }) => {
  const downloadHistories = useSelector((state) => state.download);

  const setItemChip = (status) => {
    switch (status) {
      case 'done':
        return <Chip icon={<Done/>} label='Done' color='info' variant='outlined' size='small' sx={{ backgroundColor: 'white', alignSelf: 'start' }}/>
      case 'failed':
        return <Chip icon={<PriorityHigh/>} label='Error' color='error' variant='outlined' size='small' sx={{ backgroundColor: 'white', alignSelf: 'start' }}/>
      case 'pending':
      default:
        return <CircularProgress size='24px' color='primary'/>
    }
  }

  const Item = ({ item }) => {
    return (
      <ListItem>
        <ItemWrapper status={item.status}>
          <ChipWrapper>
            {setItemChip(item.status)}
          </ChipWrapper>
          <ItemInfoWrapper>
            <ItemTitle>
              {item.title}
            </ItemTitle>
            <ItemDesc>
              <div>
                {getTimeStr(item.startTime)} ~ {getTimeStr(item.endTime)}
              </div>
              <div>
                {item.option}
              </div>
            </ItemDesc>
          </ItemInfoWrapper>
        </ItemWrapper>
      </ListItem>
    )
  }

  return (
    <Box>
      <ListHeaderWrapper>
        <Typography variant='h6'>
          다운로드 내역
        </Typography>
        <IconButton onClick={handleClose}>
          <Close/>
        </IconButton>
      </ListHeaderWrapper>
      {
        downloadHistories.length > 0 ? (
          <List>
            { downloadHistories.map((item, index) => <Item item={item} key={index}/>) }
          </List>
        ) :
        <div> No Histories </div>
      }
    </Box>
  );
};

const setBackground = (status, theme) => {
  switch (status) {
    case 'done':
      return theme.palette.info.main
    case 'failed':
      return theme.palette.error.main
    case 'pending':
    default:
      return theme.palette.info.main
  }
}

const ListHeaderWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
}))

const ItemWrapper = styled(Box)(({ theme, status }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: setBackground(status, theme),
  borderRadius: '5px',
  padding: '1rem',
}))

const ItemInfoWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.text.secondary,
}))

const ItemDesc = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}))

const ItemTitle = styled('div')(({ theme }) => ({
  paddingTop: '1.75rem',
}))

const ChipWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
}))

export default HistoryDrawer;
