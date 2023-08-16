import React from 'react';
import {Box, Chip, LinearProgress, List, ListItem, styled} from "@mui/material";
import {useSelector} from "react-redux";
import {getTimeStr} from "../../../utils/utils";
import {Done, PriorityHigh} from "@mui/icons-material";

const HistoryDrawer = () => {
  const downloadHistories = useSelector((state) => state.download);

  const setItemChip = (status) => {
    switch (status) {
      case 'done':
        return <Chip icon={<Done/>} label='Done' color='info' variant='outlined' size='small' sx={{ backgroundColor: 'white', alignSelf: 'start' }}/>
      case 'failed':
        return <Chip icon={<PriorityHigh/>} label='Error' color='error' variant='outlined' size='small' sx={{ backgroundColor: 'white', alignSelf: 'start' }}/>
      case 'pending':
      default:
        return <></>
    }
  }

  const Item = ({ item }) => {
    return (
      <ListItem>
        <ItemWrapper status={item.status}>
          <ItemInfoWrapper>
            {setItemChip(item.status)}
            <div>
              {item.title}
            </div>
            <ItemDesc>
              {getTimeStr(item.startTime)} ~ {getTimeStr(item.endTime)}
            </ItemDesc>
          </ItemInfoWrapper>
          { item.status === 'pending' &&
            <LinearProgress color={"secondary"}/>
          }
        </ItemWrapper>
      </ListItem>
    )
  }

  return (
    <Box>
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

const ItemWrapper = styled(Box)(({ theme, status }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: setBackground(status, theme),
  borderRadius: '5px',

}))

const ItemInfoWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  color: theme.palette.text.secondary,
}))

const ItemDesc = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}))

export default HistoryDrawer;
