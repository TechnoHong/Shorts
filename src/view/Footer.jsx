import * as React from 'react';
import './layout.css';
import { styled, Typography } from '@mui/material';

const ButtonAppBar = () => {
  return (
    <Footer>
      <Typography align="center" gutterBottom fontSize="0.5rem">
        ⓒ 2023 ShortsPicker All rights reserved.
      </Typography>
    </Footer>
  );
};

const Footer = styled('footer')(({ theme }) => ({
  padding: '1rem',
}));

export default ButtonAppBar;
