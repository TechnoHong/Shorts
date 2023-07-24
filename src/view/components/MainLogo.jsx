import React from 'react';
import {styled} from "@mui/material";

const MainLogo = () => {
  return (
    <div style={{
      display: 'flex',
      flexGrow: 1,
    }}>
      <Logo href={'/'}>
        SHORTS PICKER
      </Logo>
    </div>
  );
};

const Logo = styled('a')(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.secondary.main,
  fontWeight: 700,
}))

export default MainLogo;
