import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar, Tooltip,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import RestoreIcon from '@mui/icons-material/Restore';
import TimeField from '../../components/TimeField';
import {useCallback, useMemo} from "react";
import { useTranslation } from 'react-i18next';
import {useAlert} from "../../../hooks/useAlert";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function GetLabelById(id) {
  const { t } = useTranslation(['page']);
  if (id === 'rank') return t('picking.table_rank');
  if (id === 'rate') return t('picking.table_rate');
  if (id === 's_time') return t('picking.s_time');
  else return t('picking.e_time');
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'rank',
    numeric: true,
    label: 'rank',
  },
  {
    id: 'rate',
    numeric: true,
    label: 'rate',
  },
  {
    id: 's_time',
    numeric: true,
    label: 'timestamp',
  },
  {
    id: 'e_time',
    numeric: true,
    label: 'timestamp',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <label>
              {GetLabelById(headCell.id)}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </label>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar( props ) {
  const { row, index, setRestore, download } = props;
  const { t } = useTranslation(['page']);
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Shorts
      </Typography>
      { index >= 0 &&
        <Tooltip title={t('tips.btn_restore')} arrow>
        <IconButton
            aria-label="restore"
            size="large"
            onClick={(event) => setRestore(event, row, index)}>
          <RestoreIcon color="primary" />
        </IconButton>
        </Tooltip>
      }
      { index >= 0 &&
        <Tooltip title={t('tips.btn_download')} arrow>
        <IconButton
            aria-label="download"
            size="large"
            onClick={(event) => download(event, row)}>
          <DownloadOutlinedIcon color="primary" />
        </IconButton>
        </Tooltip>
      }
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  row : PropTypes.array,
  index : PropTypes.number,
  setRestore: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
};
/*
 infos = { "start_time": 2094370, "end_time": 2104370, "ratio": 61.16 },
  {"start_time": 664030, "end_time": 674030,"ratio": 60.68 }, ...
 */
const PickingCandi = ({ infos, moveYt, getShorts }) => {
  const { t } = useTranslation(['page']);
  const [selected, setSelected] = React.useState([]);
  const [tmInfo, setTmInfo] = React.useState([infos]);
  const alert = useAlert();

  React.useEffect(() => {
    setTmInfo(infos);
  }, [infos]);

  const sortedTmInfo = useMemo(() => stableSort(tmInfo, getComparator('asc', 'rank')), [tmInfo]);

  const handleClick = useCallback((event, row, index) => {
    setSelected([index]);
    moveYt(row.start_time);
  }, [setSelected, moveYt]);

  const handleDownload = (event, row) => {
    getShorts(row);
    console.log('Download time : ',row.start_time, ' - ',row.end_time);
  };
  const handleRestore = (event, row, index) => {
    const updatedRow = { ...row };
    // const prevInfos = [...infos];
    const prevInfos = [...tmInfo];

    updatedRow.start_time = infos[index].start_time;
    updatedRow.end_time = infos[index].end_time;
    prevInfos.splice(index, 1, updatedRow);
    setTmInfo(prevInfos);
    console.log('handleRestore::Success');
  };
  const setRowTimeChange = (row, index, tflag, changedTime) => {
    // const index = tmInfo.findIndex((info) => info.ratio === row.ratio);

    // warning for invalid time input
    if ((tflag === 0 && changedTime >= row.end_time) || (tflag === 1 && changedTime <= row.start_time) ){
      console.log( 'setRowTimeChange::invalid time rcv : ', index );
      alert.show('warning', (tflag === 0? t('message.invalid_s_time') : t('message.invalid_e_time')));
      return;
    }
    console.log('setRowTimeChange::idx : ', index , ', ratio : ', row.ratio );
    console.log('setRowTimeChange::before : ', row.start_time, ' - ', row.end_time);
    const updatedRow = { ...row };
    if (tflag === 0) updatedRow.start_time = changedTime;
    else updatedRow.end_time = changedTime;

    const prevInfos = [...tmInfo];
    prevInfos.splice(index, 1, updatedRow);
    setTmInfo(prevInfos);
    console.log(
        'setRowTimeChange::Success Changing time : ',
        updatedRow.start_time, ' - ', updatedRow.end_time
    );
  };
  const isSelected = (index) => selected.indexOf(index) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTableToolbar
            row={tmInfo[selected]}
            index={selected}
            setRestore={handleRestore}
            download={handleDownload}
        />
        <TableContainer>
          <Table size="small" aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={'asc'}
              orderBy={'rank'}
            />
            <TableBody>
              {sortedTmInfo.map((row, index) => {
                  const isItemSelected = isSelected(index);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell
                        component="th"
                        style={{width: '15%'}}
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                        onClick={(event) => handleClick(event, row, index) }
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                          align="center"
                          style={{width: '18%'}}
                          onClick={(event) => handleClick(event, row, index) }
                      >
                        {row.ratio + ' %'}
                      </TableCell>
                      <TableCell align="center" >
                        <TimeField
                            ytTime={row.start_time}
                            row={row}
                            idx={index}
                            tflag={0}
                            setRowTime={setRowTimeChange}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TimeField
                            ytTime={row.end_time}
                            row={row}
                            idx={index}
                            tflag={1}
                            setRowTime={setRowTimeChange}
                        />
                      </TableCell>

                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

PickingCandi.propTypes = {
  infos: PropTypes.array,
  moveYt: PropTypes.func,
  getShorts: PropTypes.func,
};

export default PickingCandi;
