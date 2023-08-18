import React from 'react';
import {Stack, styled, Typography} from "@mui/material";
import ShortsItem from "./ShortsItem";
import {useTranslation} from "react-i18next";

const RecommendedContainer = ({ ytInfo, moveYt, onChangeStartTime, onChangeEndTime }) => {
  const { t } = useTranslation(['page']);
  return (
    <RecommendedList spacing={2} sx={{
      width: {
        xs: '100%',
        sm: '100%',
        md: 'auto',
      }
    }}>
      <RecommendedTitle>{t('picking.recommend_title')}</RecommendedTitle>
      {
        ytInfo.mr_info.map((item, index) => (
          <ShortsItem
            key={index}
            info={item}
            index={index}
            moveYt={moveYt}
            onChangeStartTime={onChangeStartTime}
            onChangeEndTime={onChangeEndTime}
          />
        ))
      }
    </RecommendedList>
  );
};

const RecommendedTitle = styled(Typography)(({ theme }) => ({
  ...theme.components.MuiTypography,
  color: theme.palette.text.secondary,
  fontSize: '1rem',
  fontWeight: 500,
}));

const RecommendedList = styled(Stack)(({ theme }) => ({
  background: `${theme.palette.secondary.main}`,
  padding: '1rem',
  borderRadius: '0.5rem',
}))

export default RecommendedContainer;
