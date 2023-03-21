import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import {Tooltip} from '@mui/material';
import {ArrowRight, Download, PlayCircle, Settings} from '@mui/icons-material';

const PickingCandi = () => {
  return (
    <List sx={{ width: '100%', maxWidth: 1000 }}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
        return (
            <List key={value} component="nav" disablePadding>
            <ListItem component="div" disablePadding>
              <Tooltip title={`${value + 1}등 > Shorts ${value + 1} 00:00:00 - 00:00:00`}>
                <IconButton
                    size="large"
                    sx={{
                      display: 'flex',
                      alignItems: 'baseline',
                      alignSelf: 'start',
                      gap: '0.5rem',
                    }}
                >
                <Settings />
                <ArrowRight />
                  <Download />
                  <PlayCircle />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>
        );
      })}
    </List>
  );
};
// <ListItemText id={labelId} primary={`${value + 1}등 > Shorts ${value + 1} 00:00:00 - 00:00:00`} />
export default PickingCandi;
