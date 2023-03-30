import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  Event,
  ExpandMore,
  Launch,
  PlayArrow,
  Portrait,
  Sell,
  Visibility,
} from '@mui/icons-material';
import PropTypes from 'prop-types';

const PreviewInfoContainer = ({
  title,
  uploader,
  subscribers,
  uploadDate,
  url,
  tags,
  viewCount,
}) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>More Info.</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List disablePadding>
          <InfoItemContainer title="제목" text={title} icon={<PlayArrow />} />
          <InfoItemContainer
            title="업로더"
            text={`${uploader} (${subscribers})`}
            icon={<Portrait />}
            shortcut={url}
          />
          <InfoItemContainer
            title="조회수"
            text={viewCount}
            icon={<Visibility />}
          />
          <InfoItemContainer title="날짜" text={uploadDate} icon={<Event />} />
          {Array.isArray(tags) && tags.length !== 0 && (
            <InfoItemContainer
              title="태그"
              text={tags.toString()}
              icon={<Sell />}
            />
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

const InfoItemContainer = ({ title, text, icon, shortcut }) => {
  return (
    <ListItem disablePadding>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={title}
        primaryTypographyProps={{ fontSize: '0.75rem' }}
        secondary={text}
      />
      {shortcut && (
        <IconButton href={`https://youtube.com/${shortcut}`} target="_blank">
          <Launch />
        </IconButton>
      )}
    </ListItem>
  );
};

PreviewInfoContainer.propTypes = {
  title: PropTypes.string,
  uploader: PropTypes.string,
  subscribers: PropTypes.string,
  uploadDate: PropTypes.string,
  url: PropTypes.string,
  tags: PropTypes.array,
  viewCount: PropTypes.string,
};

export default PreviewInfoContainer;
