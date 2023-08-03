import React, {useState} from 'react';
import {GuideBox, GuideDescription, GuideTypo} from "./GuideContainer";
import {useTranslation} from "react-i18next";
import TextField from "@mui/material/TextField";
import {IconButton, styled, Tooltip} from "@mui/material";
import {Search, Whatshot, YouTube} from "@mui/icons-material";

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
          <Tooltip title='YouTube'>
            <IconButton onClick={() => window.open('https://www.youtube.com/')}>
              <YouTube color='error'/>
            </IconButton>
          </Tooltip>
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
          <Tooltip title='검색'>
            <IconButton onClick={onClickSearch}>
              <Search color='secondary'/>
            </IconButton>
          </Tooltip>
          <Tooltip title='인기 급상승'>
            <IconButton onClick={() => window.open('https://www.youtube.com/feed/trending')}>
              <Whatshot color='warning'/>
            </IconButton>
          </Tooltip>
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
