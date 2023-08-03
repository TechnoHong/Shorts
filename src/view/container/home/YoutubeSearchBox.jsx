import React, {useState} from 'react';
import {GuideBox, GuideDescription, GuideTypo} from "./GuideContainer";
import {useTranslation} from "react-i18next";
import TextField from "@mui/material/TextField";
import {IconButton, styled} from "@mui/material";
import {YouTube} from "@mui/icons-material";

const YoutubeSearchBox = () => {
  const { t } = useTranslation(['page']);
  const [keyword, setKeyword] = useState()

  const transSpaceToPlus = (str) => {
    return str.replace(' ', '+')
  }

  const onClickSearch = () => {
    if (!keyword) {
      window.open('https://www.youtube.com/')
    } else {
      window.open('https://www.youtube.com/results?search_query=' + transSpaceToPlus(keyword))
    }
  }

  const onChangeInput = (e) => {
    setKeyword(e.target.value)
  }

  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      onClickSearch()
    }
  }

  return (
    <GuideBox
      maxWidth="lg"
      sx={{
        margin: '0 auto',
        width: '100%',
        flexDirection: {
          xs: 'column',
          sm: 'column',
          md: 'column',
          lg: 'row',
        },
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <GuideDescription>
        <GuideTypo sx={{
          fontSize: '1rem',
          fontWeight: 700,
        }}>
          {t('main.guideTitle5')}
        </GuideTypo>
        <SearchWrapper>
          <TextField
            placeholder={t('main.youtubePlaceholder')}
            variant="outlined"
            color='secondary'
            size="small"
            sx={{ width: '100%' }}
            value={keyword}
            onChange={onChangeInput}
            onKeyUp={onPressEnter}
          />
          <IconButton onClick={onClickSearch}>
            <YouTube color='secondary'/>
          </IconButton>
        </SearchWrapper>
      </GuideDescription>
    </GuideBox>
  );
};

const SearchWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  gap: '0.5rem',
}))

export default YoutubeSearchBox;
