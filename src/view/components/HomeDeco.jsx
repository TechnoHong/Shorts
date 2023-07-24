import React from 'react';
import {styled} from "@mui/material";

const HomeDeco = () => {
  return (
    <Root>
      {`Shorts Picker   쇼츠피커   ショーツピッカー   шорт-пикер   挑空器   cueilleur de shorts   निकर पिकर   กางเกงขาสั้น   thợ may quần đùi cortões   \nनिकर पिकर   กางเกงขาสั้น   thợ may quần đùi cortões   Shorts Picker   쇼츠피커   ショーツピッカー   шорт-пикер   挑空器   \ncueilleur de shorts   निकर पिकर   กางเกงขาสั้น   thợ may quần đùi cortões   \nthợ may quần đùi cortões   Shorts Picker   쇼츠피커   ショーツピッカー   шорт-пикер   挑空器   cueilleur de shorts   निकर पिकर   กางเกงขาสั้น   thợ may quần đùi cortões   \ncueilleur de shorts   निकर पिकर   กางเกงขาสั้น   thợ may quần đùi cortões   Shorts Picker   쇼츠피커   ショーツピッカー   шорт-пикер   挑空器   \n挑空器   cueilleur de shorts   निकर पिकर   กางเกงขาสั้น   thợ may quần đùi cortões   \n`}
    </Root>
  );
};

const Root = styled('div')(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  textOverflow: 'clip',
  whiteSpace: 'pre',
  overflow: 'hidden',

  background: theme.palette.background.homeTypoGradient,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
}))

export default HomeDeco;
