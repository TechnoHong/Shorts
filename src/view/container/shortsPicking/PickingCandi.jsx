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
  Toolbar,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { Download } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import TimeField from '../../components/TimeField';
import {useCallback, useMemo} from "react";

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
  if ( id === 's_time') return t('picking.s_time');
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

function EnhancedTableToolbar() {
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

      <IconButton>
        <CloudDownloadIcon color="primary" fontSize="large" />
      </IconButton>
    </Toolbar>
  );
}
/*
 infos = { "start_time": 2094370, "end_time": 2104370, "ratio": 61.16 },
  {"start_time": 664030, "end_time": 674030,"ratio": 60.68 }, ...
 */


const PickingCandi = ({ infos, moveYt, getShorts }) => {
  const [selected, setSelected] = React.useState([]);
  const [tmInfo, setTmInfo] = React.useState([infos]);

  React.useEffect(() => {
    console.log('.. ',tmInfo[0]) ;
    setTmInfo(infos);
  }, [infos]);

  // const handleClick = (event, index, row) => {
  //   setSelected([index]);
  //   moveYt(row.start_time);
  //   console.log('Clicked time : ',row.start_time);
  // };
  const sortedTmInfo = useMemo(() => stableSort(tmInfo, getComparator('asc', 'rank')), [tmInfo]);

  const handleClick = useCallback((event, row) => {
    setSelected([row.rank]);
    moveYt(row.start_time);
    console.log('Clicked time : ', row.start_time);
  }, [setSelected, moveYt]);
  const handleDownload = (event, row) => {
    getShorts(row);
    console.log('Download time : ',row.start_time, ' - ',row.end_time);
  };

  // const setRowTimeChange = (row, tflag, changedTime) => {
  //   if ( tflag === 0 ) row.start_time = changedTime ;
  //   else row.end_time = changedTime ;
  //   console.log('Change time[',row.rank,'] : ',row.start_time, ' - ',row.end_time);
  // };

  // start_time이 end_time보다 큼 || end_time이 start_time보다 작음 >> error 발생시키기
  const setRowTimeChange = (row, tflag, changedTime) => {
    const index = tmInfo.findIndex((info) => info.id === row.id);
    if (index === -1) return;

    console.log(
        'setRowTimeChange::before : ',
        row.start_time, ' - ', row.end_time
    );
    console.log('setRowTimeChange::received : ', changedTime);
    const updatedRow = { ...row };
    if (tflag === 0) updatedRow.start_time = changedTime;
    else updatedRow.end_time = changedTime;

    const prevInfos = [...tmInfo];
    prevInfos.splice(index, 1, updatedRow);
    setTmInfo(prevInfos);
    console.log(
        'setRowTimeChange::Changed to  : ',
        updatedRow.start_time, ' - ', updatedRow.end_time
    );
  };

  const isSelected = (name) => selected.toString().indexOf(name) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTableToolbar />
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
                        onClick={(event) => handleClick(event, row) }
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                          align="center"
                          style={{width: '18%'}}
                          onClick={(event) => handleClick(event, row) }
                      >
                        {row.ratio + ' %'}
                      </TableCell>
                      <TableCell align="center" >
                        <TimeField ytTime={row.start_time} row={row} tflag={0} setRowTime={setRowTimeChange}/>
                      </TableCell>
                      <TableCell align="center">
                        <TimeField ytTime={row.end_time} row={row} tflag={1} setRowTime={setRowTimeChange}/>
                      </TableCell>
                      <TableCell style={{width: '1%'}}>
                        <IconButton
                            aria-label="download"
                            size="large"
                            onClick={(event) => handleDownload(event, row)}>
                          <Download color="primary" />
                        </IconButton>
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
// {stableSort(infos, getComparator('asc', 'rank'))
// {stableSort(tmInfo, getComparator('asc', 'rank'))
//     .slice()
//     .map((row, index) => {
PickingCandi.propTypes = {
  infos: PropTypes.array,
  moveYt: PropTypes.func,
  getShorts: PropTypes.func,
};

export default PickingCandi;
