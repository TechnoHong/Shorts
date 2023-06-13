import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

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
              main: '#3E54AC',
              light: '#ECF2FF',
              dark: '#655DBB',
            },
            secondary: {
              main: '#E90064',
              light: '#FF5F9E',
              dark: '#B3005E',
            },
            text: {
              primary: '#18122B',
              mainDescription: '#d6e5ff',
              guide: '#655DBB',
            },
            background: {
              homeMainContainer:
                'linear-gradient(180deg, rgba(62,84,172,1) 0%, rgba(101,93,187,1) 100%)',
              homeSubContainer:
                'linear-gradient(45deg, rgba(237,233,254,1) 0%, rgba(224,235,251,1) 25%, rgba(213,237,255,1) 66%, rgba(255,255,255,1) 100%)',
              homeSearchContainer: 'rgba(255,255,255,0.5)',
              homeTypoGradient:
                'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
            },
          }
        : {
            primary: {
              main: '#443C68',
              light: '#635985',
              dark: '#18122B',
            },
            secondary: {
              main: '#E90064',
              light: '#FF5F9E',
              dark: '#B3005E',
            },
            text: {
              primary: '#d6e5ff',
              mainDescription: '#d6e5ff',
              guide: '#d6e5ff',
            },
            background: {
              default: grey[900],
              homeMainContainer:
                'linear-gradient(180deg, rgba(68,60,104,1) 0%, rgba(40,35,45,1) 100%)',
              homeSubContainer:
                'linear-gradient(45deg, rgba(83,81,93,1) 0%, rgba(82,93,110,1) 25%, rgba(59,102,135,1) 66%, rgba(47,30,93,1) 100%)',
              homeSearchContainer: 'rgba(0,0,0,0.5)',
              homeTypoGradient:
                'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
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
