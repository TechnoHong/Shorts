import { createTheme } from '@mui/material';

export const theme = (mode) =>
  createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            height: '100%',
          },
          body: {
            margin: 0,
            padding: 0,
            height: '100%',
          },
          '#root': {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      },
    },
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: '#ffffff',
              light: '#a5bbff',
              dark: '#dadada',
            },
            secondary: {
              main: '#6a7efa',
              light: '#f3f4ff',
              dark: '#112564',
            },
            text: {
              primary: '#000000',
              secondary: '#ffffff',
              guide: '#949494',
            },
            background: {
              halfOpacity: 'rgba(255,255,255,0.5)',
              subContainer: '#6a7efa',
              homeTypoGradient:
                'linear-gradient(0deg, #a5bbff 0%, #6a7efa 100%)',
            },
          }
        : {
            primary: {
              main: '#121212',
              light: '#3c424b',
              dark: '#1a1a1a',
            },
            secondary: {
              main: '#6a7efa',
              light: '#f3f4ff',
              dark: '#112564',
            },
            text: {
              primary: '#ffffff',
              secondary: '#ffffff',
              guide: '#949494',
            },
            background: {
              halfOpacity: 'rgba(18,18,18,0.5)',
              subContainer: '#242424',
              homeTypoGradient:
                'linear-gradient(0deg, #3c424b 0%, #242424 100%)',
            },
          }),
    },
    typography: {
      fontFamily: [
        'Noto Sans KR', 'sans-serif',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
      ].join(','),
    },
  });
