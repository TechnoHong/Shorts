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

function createData(rank, rate, timet) {
  return {
    rank,
    rate,
    timet,
  };
}
// todo : rows를 iter돌려서 createData
// todo : 확인사항 : rank 순서대로 던져주는지
const rows = [
  createData(1, 30, '00:20:40 - 00:20:50'),
  createData(2, 19, '00:00:10 - 00:00:20'),
  createData(3, 17, '00:20:30 - 00:20:40'),
  createData(4, 12, '00:53:50 - 00:54:00'),
  createData(5, 23, '00:12:20 - 00:22:30'),
  createData(6, 17, '00:24:30 - 00:29:40'),
  createData(7, 17, '00:27:30 - 00:34:40'),
];
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) { return -1; }
  if (b[orderBy] > a[orderBy]) { return 1; }
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
  else return t('picking.table_timet');
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
    label: 'rate (%)',
  },
  {
    id: 'timet',
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

const PickingCandi = ({infos, moveYt}) => {
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
    console.log('1');
    moveYt(timet);
  };

  const isSelected = (name) => selected.toString().indexOf(name) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}/>
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice()
                .map((row, index) => {
                  const isItemSelected = isSelected(row.rank);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.rank, row.timet)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.rank}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.rank}
                      </TableCell>
                      <TableCell align="center">{row.rate}</TableCell>
                      <TableCell align="center">{row.timet}</TableCell>
                      <IconButton aria-label="delete" size="large">
                        <Download color="primary" />
                      </IconButton>
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
  infos : PropTypes.array,
  moveYt : PropTypes.func,
};

export default PickingCandi;
