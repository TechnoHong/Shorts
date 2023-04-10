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
import { Download } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import TimeField from '../../components/TimeField';

function GetLabelById(id) {
  const { t } = useTranslation(['page']);
  if (id === 'rank') return t('picking.table_rank');
  if (id === 'rate') return t('picking.table_rate');
  if (id === 's_time') return t('picking.s_time');
  else return t('picking.e_time');
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

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={'center'} padding={'normal'}>
            {GetLabelById(headCell.id)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

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

  const handleClick = (event, name, timet) => {
    setSelected(name);
    moveYt(timet);
    console.log('Clicked time : ', timet);
  };
  const handleDownload = (event, row) => {
    getShorts(row);
    console.log('Download time : ', row.start_time, ' - ', row.end_time);
  };

  const isSelected = (name) => selected.toString().indexOf(name) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table size="small" aria-labelledby="tableTitle">
            <EnhancedTableHead />
            <TableBody>
              {infos.map((row, index) => {
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
                      style={{ width: '15%' }}
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="center"
                      onClick={(event) =>
                        handleClick(event, index, row.start_time)
                      }
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{ width: '18%' }}
                      onClick={(event) => handleClick(event, index, row)}
                    >
                      {row.ratio + ' %'}
                    </TableCell>
                    <TableCell align="center">
                      <TimeField ytTime={row.start_time} />
                    </TableCell>
                    <TableCell align="center">
                      <TimeField ytTime={row.end_time} />
                    </TableCell>
                    <TableCell style={{ width: '1%' }}>
                      <IconButton
                        aria-label="download"
                        size="large"
                        onClick={(event) => handleDownload(event, row)}
                      >
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
