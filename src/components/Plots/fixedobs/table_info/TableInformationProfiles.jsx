import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.info.dark,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const TableInformationProfiles = () => {
    const state = useSelector(state=>state);
  const data_highcharts = state.dataHighchart;
  const [open, setOpen] = React.useState(false);
    return (
        <TableContainer component={Paper} className='mt-4 d-flex justify-content-start '>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell >Properties</StyledTableCell>
                <StyledTableCell >Description</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            
                        
              {data_highcharts != null ?
                data_highcharts.variables_names.map((row, index) => (
                    <React.Fragment>
                        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <StyledTableCell>
                            <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                            >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row}
                            </StyledTableCell>
                            <StyledTableCell>
                                {data_highcharts.standard_names[index]}
                            </StyledTableCell>
                        </StyledTableRow>
                    </React.Fragment>
                        
              ))
              :
              null}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default TableInformationProfiles;
