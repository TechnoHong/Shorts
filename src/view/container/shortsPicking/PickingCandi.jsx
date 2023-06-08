import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import {
  Backdrop,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import PropTypes from 'prop-types';
import TimeField from '../../components/TimeField';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAlert } from '../../../hooks/useAlert';
import { Download, PlayArrowRounded } from '@mui/icons-material';
/*
 infos = { "start_time": 2094370, "end_time": 2104370, "ratio": 61.16 },
  {"start_time": 664030, "end_time": 674030,"ratio": 60.68 }, ...
 */
const PickingCandi = ({ infos, moveYt, getShorts }) => {
  const { t } = useTranslation(['page']);
  const [selected, setSelected] = React.useState([]);
  const [tmInfo, setTmInfo] = React.useState([infos]);
  const [loading, setLoading] = React.useState(false);
  const alert = useAlert();

  React.useEffect(() => {
    setTmInfo(infos);
  }, [infos]);

  const handleClick = useCallback(
    (event, row, index) => {
      setSelected([index]);
      moveYt(row.start_time);
    },
    [setSelected, moveYt],
  );

  const handleDownload = (event, row) => {
    setLoading(true);
    getShorts(row).then(() => setLoading(false));
  };

  const setRowTimeChange = (row, index, tflag, changedTime) => {
    // const index = tmInfo.findIndex((info) => info.ratio === row.ratio);

    // warning for invalid time input
    if (
      (tflag === 0 && changedTime >= row.end_time) ||
      (tflag === 1 && changedTime <= row.start_time)
    ) {
      alert.show(
        'warning',
        tflag === 0 ? t('message.invalid_s_time') : t('message.invalid_e_time'),
      );
      return;
    }
    const updatedRow = { ...row };
    if (tflag === 0) updatedRow.start_time = changedTime;
    else updatedRow.end_time = changedTime;

    const prevInfos = [...tmInfo];
    prevInfos.splice(index, 1, updatedRow);
    setTmInfo(prevInfos);
  };
  const isSelected = (index) => selected.indexOf(index) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell align="center">순위</TableCell>
                <TableCell align="center">재시청률</TableCell>
                <TableCell align="center">시작</TableCell>
                <TableCell align="center">종료</TableCell>
                <TableCell align="center">재생</TableCell>
                <TableCell align="center">저장</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tmInfo.map((row, index) => {
                const isItemSelected = isSelected(index);

                return (
                  <TableRow hover key={index} selected={isItemSelected}>
                    <TableCell
                      component="th"
                      style={{ width: '10%' }}
                      scope="row"
                      padding="none"
                      align="center"
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell align="center" style={{ width: '15%' }}>
                      {row.ratio + ' %'}
                    </TableCell>
                    <TableCell align="center" style={{ padding: 0 }}>
                      <TimeField
                        ytTime={row.start_time}
                        row={row}
                        idx={index}
                        tflag={0}
                        setRowTime={setRowTimeChange}
                      />
                    </TableCell>
                    <TableCell align="center" style={{ padding: 0 }}>
                      <TimeField
                        ytTime={row.end_time}
                        row={row}
                        idx={index}
                        tflag={1}
                        setRowTime={setRowTimeChange}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={(e) => handleClick(e, row, index)}>
                        <PlayArrowRounded />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={(e) => handleDownload(e, row)}>
                        <Download />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    </Box>
  );
};

PickingCandi.propTypes = {
  infos: PropTypes.array,
  moveYt: PropTypes.func,
  getShorts: PropTypes.func,
};

export default PickingCandi;
