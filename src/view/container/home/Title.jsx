import React from 'react';
import {styled} from "@mui/material";

const Title = () => {
  return (
    <TitleWrapper>
      SHORTS PICKER
    </TitleWrapper>
  );
};

const TitleWrapper = styled('div')(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: 700,
  fontSize: '4rem',
  textAlign: 'center',
  lineHeight: '100%',
}))

export default Title;
