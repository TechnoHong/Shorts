import React from 'react';
import {Box, CircularProgress, List, ListItem} from "@mui/material";
import {useSelector} from "react-redux";

const HistoryDrawer = () => {
  const downloadHistories = useSelector((state) => state.download);

  const Item = ({ item }) => {
    return (
      <ListItem>
        <div>
          {`${item.title} ${item.startTime} ${item.endTime} ${item.status}`}
        </div>
        { item.status === 'pending' &&
          <CircularProgress color={"secondary"}/>
        }
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

export default HistoryDrawer;
