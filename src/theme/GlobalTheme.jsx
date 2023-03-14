import { createTheme } from '@mui/material';
import { blue, green, red } from '@mui/material/colors';

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
              main: blue[500],
            },
            secondary: {
              main: green[500],
            },
            text: {
              primary: blue[500],
            },
          }
        : {
            primary: {
              main: blue[500],
            },
            secondary: {
              main: green[500],
            },
            text: {
              primary: red[500],
            },
          }),
    },
    typography: {
      fontFamily: [
        'Noto Sans KR',
        'sans-serif',
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
