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
import { useTranslation } from 'react-i18next';

const PreviewInfoContainer = ({
  title,
  uploader,
  subscribers,
  uploadDate,
  url,
  tags,
  viewCount,
}) => {
  const { t } = useTranslation(['page']);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{t('picking.info.more_info')}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List disablePadding>
          <InfoItemContainer
            title={t('picking.info.title')}
            text={title}
            icon={<PlayArrow />}
            shortcut=""
          />
          <InfoItemContainer
            title={t('picking.info.uploader')}
            text={`${uploader} (${subscribers})`}
            icon={<Portrait />}
            shortcut={url}
          />
          <InfoItemContainer
            title={t('picking.info.view_count')}
            text={viewCount}
            icon={<Visibility />}
            shortcut=""
          />
          <InfoItemContainer
            title={t('picking.info.date')}
            text={uploadDate}
            icon={<Event />}
            shortcut=""
          />
          {Array.isArray(tags) && tags.length !== 0 && (
            <InfoItemContainer
              title={t('picking.info.tag')}
              text={tags.toString()}
              icon={<Sell />}
              shortcut=""
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

InfoItemContainer.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.node,
  shortcut: PropTypes.string.isRequired,
};

export default PreviewInfoContainer;
