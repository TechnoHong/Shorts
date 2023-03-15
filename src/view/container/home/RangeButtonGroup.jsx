import React, { useState } from 'react';
import { Box, styled, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';

const RangeButtonGroup = () => {
  const { t } = useTranslation(['page']);
  const [count, setCount] = useState(10);

  const handleCount = (event, newCount) => {
    if (newCount !== null) {
      setCount(newCount);
    }
  };

  return (
    <Box>
      <ToggleButtonGroup
        color="primary"
        size="small"
        value={count}
        exclusive
        onChange={handleCount}
      >
        <RangeSelectedToggle value={1}>
          {t('main.count', { count: 1 })}
        </RangeSelectedToggle>
        <RangeSelectedToggle value={3}>
          {t('main.count', { count: 3 })}
        </RangeSelectedToggle>
        <RangeSelectedToggle value={5}>
          {t('main.count', { count: 5 })}
        </RangeSelectedToggle>
        <RangeSelectedToggle value={10}>
          {t('main.count', { count: 10 })}
        </RangeSelectedToggle>
      </ToggleButtonGroup>
    </Box>
  );
};

const RangeSelectedToggle = styled(ToggleButton)(({ theme }) => ({
  ...theme.components.MuiToggleButton,
  size: 'large',
  textTransform: 'none',
}));

export default RangeButtonGroup;
