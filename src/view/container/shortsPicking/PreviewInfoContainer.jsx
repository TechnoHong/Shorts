import React, {useState} from 'react';
import { Box, Button, Dialog, DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText, styled,
} from '@mui/material';
import {
  Event,
  InfoOutlined,
  Launch,
  PlayArrow,
  Portrait,
  Sell,
  Visibility,
} from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ShortsCustomContainer from "./ShortsCustomContainer";

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
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <Root>
      <Button variant='outlined' onClick={handleOpen} endIcon={<InfoOutlined/>} sx={{ alignSelf: 'end' }}>
        {t('picking.info.more_info')}
      </Button>
      <ShortsCustomContainer/>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('picking.info.more_info')}</DialogTitle>
        <InfoList>
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
        </InfoList>
      </Dialog>
    </Root>
  );
};

const InfoItemContainer = ({ title, text, icon, shortcut }) => {
  return (
    <ListItem>
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

const InfoList = styled(List)(({ theme }) => ({
  ...theme.components.MuiList,
  background: theme.palette.secondary.main,
}))

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0.5rem 0',
  gap: '0.5rem',
}))

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
