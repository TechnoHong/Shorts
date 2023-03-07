import React, { useMemo, useState } from 'react';
import Menubar from './layout/Menubar';
import Home from './Home';
import Footer from './layout/Footer';
import { createTheme, ThemeProvider } from '@mui/material';
import { ColorModeContext } from './context/ColorContext';

const App = () => {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Menubar />

        <Home />

        <Footer />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
