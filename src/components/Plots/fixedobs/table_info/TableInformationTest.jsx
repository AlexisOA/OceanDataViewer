import React, {useEffect, useState}from 'react';
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
import Checkbox from '@mui/material/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { setTranferlistChoose } from '../../../../store/actions/highchartActions';


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




const TableInformationTest = () => {
  const state = useSelector(state=>state);
  const data_highcharts = state.dataHighchart;
  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();
  //function
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const [selected, setSelected] = React.useState([]);
  const [selectedObj, setSelectedObj] = React.useState([]);
  // let selected = []
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const btnClick = () => {
    console.log(selected)
    if(selected.length > 0){
      let selectedObj = []
      selected.map((name, idx)=>{
        let obj = data_highcharts.table_info.find(o => o.name_data === name);
        if(obj != null){
          selectedObj.push(obj)
        }
      })

      let new_object = []
        data_highcharts.table_info.map((value, idx) => {
            if(!value.show_data){
            const obj = {
                "name": value.name_data,
                "value": value.dataset.values
            }
            new_object.push(obj)
            }
        });

        selectedObj.map((value_right, index) => {
            value_right['sediments_info'] = new_object;
        });

      dispatch(setTranferlistChoose(selectedObj))
    }
  };



  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };


    return (
      <div>
          <TableContainer component={Paper} className='mt-4 d-flex justify-content-start '>
                    <Table aria-label="collapsible table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell />
                          <StyledTableCell>Properties</StyledTableCell>
                          <StyledTableCell >Description</StyledTableCell>
                          <StyledTableCell >Select</StyledTableCell>
                          {/* <StyledTableCell padding="checkbox">
                            <Checkbox
                              color="secondary"
                              // indeterminate={numSelected > 0 && numSelected < rowCount}
                              // checked={rowCount > 0 && numSelected === rowCount}
                              // onChange={onSelectAllClick}
                              inputProps={{
                                'aria-label': 'select all desserts',
                              }}
                            />
                          </StyledTableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data_highcharts != null ?
                          data_highcharts.table_info.map((row, index)=>{
                            if(row.show_data){
                              const isItemSelected = isSelected(row.name_data);
                              const labelId = `enhanced-table-checkbox-${index}`;
                              return <React.Fragment key={row.name_data}>
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
                                    {row.name_data}
                                  </StyledTableCell>
                                  <StyledTableCell>{row.Standard_name}</StyledTableCell>
                                  
                                  <StyledTableCell padding="checkbox">
                                  <Checkbox
                                                  color="primary"
                                                  checked={isItemSelected}
                                                  // onChange={(e) => handleChange()}
                                                  onChange={(event) => handleClick(event, row.name_data)}
                                                  inputProps={{
                                                    'aria-labelledby': labelId,
                                                  }}
                                                />
                                  </StyledTableCell>
                                </StyledTableRow>
                                <TableRow>
                                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                      <Box sx={{ margin: 1 }}>
                                        <Typography variant="h6" gutterBottom component="div">
                                          Info
                                        </Typography>
                                        <Table size="small" aria-label="purchases">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell>Units</TableCell>
                                              <TableCell>Min Value</TableCell>
                                              <TableCell align="right">Max Value</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {row.info.map((infoRow) => (
                                              <TableRow key={infoRow.Units}>
                                                <TableCell component="th" scope="row">
                                                  {infoRow.Units}
                                                </TableCell>
                                                <TableCell>{infoRow.Min_value}</TableCell>
                                                <TableCell align="right">{infoRow.Max_value}</TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </Box>
                                    </Collapse>
                                  </TableCell>
                                </TableRow>
                              </React.Fragment>
                            }
                          })
                        :
                        null}
                      </TableBody>
                    </Table>
                  </TableContainer>
        <div className="row mt-3">
          <div className='col-md-12 d-flex justify-content-end'>
            <button className='btn btn-primary' disabled={selected.length > 0 ? false : true} onClick={() => btnClick()}>Generate Plot</button>
          </div>
        </div>
      </div>
        
    );
}

export default TableInformationTest;
