import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {Brightness4, Brightness7} from "@material-ui/icons";
import {useTheme} from "@mui/material";
import {ColorModeContext} from "../context/ColorContext";

const ColorModeContainer = () => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  return (
    <div>
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </div>
  )
}

const ButtonAppBar = () => {
  return (
      <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
              <Toolbar>
                  <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                  >
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      POKE2
                  </Typography>
                  <ColorModeContainer />
              </Toolbar>
          </AppBar>
      </Box>
  );
}
export default ButtonAppBar;