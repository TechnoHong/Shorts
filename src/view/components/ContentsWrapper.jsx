import { Container, styled } from '@mui/material';

export const ContentsWrapper = styled(Container)(({ theme }) => ({
  ...theme.components.MuiContainer,
  flex: 1,
  padding: '2rem',
}));
