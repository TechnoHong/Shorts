import React from 'react';
import {styled} from "@mui/material";

const CoupangBanner = () => {
  return (
    <BannerWrapper dangerouslySetInnerHTML={{ __html:
        '<iframe src="https://ads-partners.coupang.com/widgets.html?id=692425&template=carousel&trackingCode=AF3157721&subId=&width=680&height=140&tsource=" width="100%" frameborder="0" scrolling="no" referrerpolicy="unsafe-url"></iframe>'
    }}/>
  );
};

const BannerWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  zIndex: 1,
}))

export default CoupangBanner;
