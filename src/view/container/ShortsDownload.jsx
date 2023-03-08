import React from 'react';
import { Container, Paper, Stack, styled } from '@mui/material';

const ShortsDownload = () => {
  return (
    <Container maxWidth="sm">
      <Stack spacing={2}>
        <Item>item1</Item>
        <Item>item2</Item>
        <Item>item3</Item>
      </Stack>
    </Container>
  );
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default ShortsDownload;
