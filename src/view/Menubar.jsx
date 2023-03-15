import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  useTheme,
  MenuItem,
  Menu,
  Button,
  Tooltip,
  Container,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {
  Brightness4,
  Brightness7,
  Language,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { ColorModeContext } from '../context/ColorContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const pages = null;

const ColorModeContainer = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={`${theme.palette.mode.toUpperCase()} MODE`}>
        <IconButton
          sx={{ ml: 1, p: 0 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === 'dark' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const ChangeLangContainer = () => {
  const { t, i18n } = useTranslation(['page']);

  const handleChangeLang = () => {
    i18n.language === 'ko'
      ? i18n.changeLanguage('en')
      : i18n.changeLanguage('ko');
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={t('appbar.language')}>
        <IconButton
          sx={{ ml: 1, p: 0 }}
          onClick={handleChangeLang}
          color="inherit"
        >
          <Language />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const ButtonAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" elevation={0} enableColorOnDark>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Roboto',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ShortsPicker
          </Typography>
          {pages && (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Roboto',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Shorts Picker
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages &&
              pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
          </Box>
          <ChangeLangContainer />
          <ColorModeContainer />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ButtonAppBar;
