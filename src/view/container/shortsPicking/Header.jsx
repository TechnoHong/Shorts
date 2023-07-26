import React from 'react';
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Grid, styled} from "@mui/material";
import {useTranslation} from "react-i18next";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";

const Header = ({ onClickDownload }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(['page']);

  const onClickToMain = () => {
    navigate(-1)
  }

  return (
    <HeaderContainer container justifyContent='space-between' alignItems='center'>
      <IconButton onClick={onClickToMain}>
        <ArrowBackIcon />
      </IconButton>
      <Button
        variant="contained"
        disableElevation
        endIcon={<KeyboardArrowRightIcon />}
        onClick={onClickDownload}
        color='secondary'>
        {t('tips.btn_download')}
      </Button>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(Grid)(({ theme }) => ({
  ...theme.components.MuiGrid,
  width: '100%',
  padding: '1rem',
}))

export default Header;
