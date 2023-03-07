import React, { useMemo, useState } from 'react';
import Menubar from './view/Menubar';
import Home from './Home';
import Footer from './view/Footer';
import { createTheme, ThemeProvider } from '@mui/material';
import { ColorModeContext } from './context/ColorContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShortsDownload from './view/container/ShortsDownload';
import NotFound from './view/container/NotFound';

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
        <BrowserRouter>
          <Menubar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/download" element={<ShortsDownload />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
