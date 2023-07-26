import React from 'react';
import {Box, List, ListItem} from "@mui/material";

const HistoryDrawer = () => {
  const downloadHistories = [
    {
      title: 'title',
      status: 'done',
    },
  ]
  return (
    <Box>
      <List>
        {
          downloadHistories.map((item, index) => (
            <ListItem key={index}>
              다운로드 내역 작업중...
            </ListItem>
          ))
        }
      </List>
    </Box>
  );
};

export default HistoryDrawer;
