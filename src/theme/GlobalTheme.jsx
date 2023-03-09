import { createTheme } from '@mui/material';
import { blue, green } from '@mui/material/colors';

export const theme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: blue[500],
      },
      secondary: {
        main: green[500],
      },
    },
  });
