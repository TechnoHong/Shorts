import { Container, styled } from '@mui/material';

export const ContentsWrapper = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: '1.5rem',
  alignItems: 'center',
}));
