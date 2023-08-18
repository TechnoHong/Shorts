import React, {useState} from 'react';
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Badge, Drawer, Grid, styled} from "@mui/material";
import {useTranslation} from "react-i18next";
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import HistoryIcon from '@mui/icons-material/History';
import ButtonGroup from "@mui/material/ButtonGroup";
import HistoryDrawer from "./HistoryDrawer";

const Header = ({ onClickDownload, badge }) => {
  const navigate = useNavigate();
  const { t } = useTranslation(['page']);
  const [drawer, setDrawer] = useState(false)

  const onClickToMain = () => {
    navigate(-1)
  }

  const toggleDrawer = () => {
    setDrawer(!drawer)
  }

  console.log('hong', badge)

  return (
    <HeaderContainer container justifyContent='space-between' alignItems='center'>
      <IconButton onClick={onClickToMain}>
        <ArrowBackIcon />
      </IconButton>
      <DownloadButtonGroup>
        <Button
          variant="contained"
          disableElevation
          endIcon={<KeyboardArrowRightIcon />}
          onClick={onClickDownload}
          color='secondary'>
          {t('tips.btn_download')}
        </Button>
        <Badge badgeContent={badge} color='secondary' invisible={badge <= 0}>
          <IconButton onClick={toggleDrawer}>
            <HistoryIcon/>
          </IconButton>
        </Badge>
      </DownloadButtonGroup>
      <Drawer
        anchor='right'
        open={drawer}
        onClose={toggleDrawer}
      >
        <HistoryDrawer handleClose={toggleDrawer}/>
      </Drawer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(Grid)(({ theme }) => ({
  ...theme.components.MuiGrid,
  width: '100%',
  padding: '1rem',
}))

const DownloadButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  ...theme.components.MuiButtonGroup,
  border: `1px solid ${theme.palette.secondary.main}`
}))

export default Header;
