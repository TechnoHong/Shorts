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
  TableSortLabel,
  Toolbar,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import { Download } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import TimeField from '../../components/TimeField';

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
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

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
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {GetLabelById(headCell.id)}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
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
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('rank');
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name, timet) => {
    setSelected(name);
    moveYt(timet);
    console.log('Clicked time : ',timet);
  };
  const handleDownload = (event, row) => {
    getShorts(row);
    console.log('Download time : ',row.start_time, ' - ',row.end_time);
  };

  // const setRowTimeChange = (row, tflag, changedTime) => {
  //   if(tflag === 0){
  //
  //   }else{
  //
  //   }
  //   console.log('Download time : ',row.start_time, ' - ',row.end_time);
  // };

  const isSelected = (name) => selected.toString().indexOf(name) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table size="small" aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={infos.length}
            />
            <TableBody>
              {stableSort(infos, getComparator(order, orderBy))
                .slice()
                .map((row, index) => {
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
                        onClick={(event) => handleClick(event, index, row.start_time) }
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                          align="center"
                          style={{width: '18%'}}
                          onClick={(event) => handleClick(event, index, row) }
                      >
                        {row.ratio + ' %'}
                      </TableCell>
                      <TableCell align="center" >
                        <TimeField ytTime={row.start_time}/>
                      </TableCell>
                      <TableCell align="center">
                        <TimeField ytTime={row.end_time} />
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

PickingCandi.propTypes = {
  infos: PropTypes.array,
  moveYt: PropTypes.func,
  getShorts: PropTypes.func,
};

export default PickingCandi;
