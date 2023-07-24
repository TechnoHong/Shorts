import React from 'react';
import {Paper, Stack, styled, Typography} from "@mui/material";
import VideoPreview from "../../components/VideoPreview";
import PreviewInfoContainer from "./PreviewInfoContainer";
import {useTranslation} from "react-i18next";
import RatioSelector from "./RatioSelector";

const PreviewContainer = ({ ytInfo, timeStamp, handleChangeRatio, ratio }) => {
  const { t } = useTranslation(['page']);

  return (
    <PreviewPaper elevation={5}>
      <PreviewHeader direction='row' justifyContent='space-between' alignItems='end'>
        <PreviewTitle align="left">
          {t('shortsDownload.preview')}
        </PreviewTitle>
        <RatioSelector handleChangeRatio={handleChangeRatio} ratio={ratio} />
      </PreviewHeader>
      <div
        style={{
          position: 'relative',
          paddingTop: '56.25%' /* 720 / 1280 = 0.5625 */,
        }}
      >
        <VideoPreview
          isAutoPlay={true}
          ytURL={
            'https://youtu.be/' +
            ytInfo.video_id +
            '?t=' +
            timeStamp / 1000
          }
        />
      </div>
      <PreviewInfoContainer
        title={ytInfo.title}
        uploader={ytInfo.owner.owner}
        subscribers={ytInfo.owner.owner_subscribers}
        uploadDate={ytInfo.upload_date}
        tags={ytInfo.tags}
        url={ytInfo.owner.owner_url}
        viewCount={ytInfo.view_count}
      />
    </PreviewPaper>
  );
};

const PreviewPaper = styled(Paper)(({ theme }) => ({
  ...theme.components.MuiPaper,
  width: '100%',
  maxWidth: '50rem',
  position: 'static',
  top: '1rem',
  background: theme.palette.secondary.main,
  padding: '2rem',
}));

const PreviewTitle = styled(Typography)(({ theme }) => ({
  ...theme.components.MuiTypography,
  color: theme.palette.text.secondary,
  fontSize: '1rem',
  fontWeight: 500,
  padding: '0.5rem 0',
}));

const PreviewHeader = styled(Stack)(({ theme }) => ({
  ...theme.components.MuiStack,
}))

export default PreviewContainer;
