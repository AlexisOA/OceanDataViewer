import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

const TableInformationProfiles = () => {
  const state = useSelector(state=>state);
  const data_highcharts = state.dataHighchart;
  const dispatch = useDispatch();

  const [selected, setSelected] = React.useState([]);
  const isSelected = (name) => selected.indexOf(name) !== -1;

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

  const btnClick = () => {
    console.log(selected)
    if(selected.length > 0){
      let data = []
      selected.map((value, idx) => {
        let data_obj = {}
        let data_variables = []
        for (const key in data_highcharts.table_info) {
          data_highcharts.table_info[key].map((variables, index) => {
            if(variables.Standard_name_variable === value){
              data_variables.push(variables)
            }
          })
        }
        data_obj.type_chart = "profile";
        data_obj.dataset = data_variables;
        data.push(data_obj);
      })
      
      console.log(data);
      dispatch(setTranferlistChoose(data))

    }
  };

    return (
        <div>
          <TableContainer component={Paper} className='mt-4 d-flex justify-content-start '>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell >Properties</StyledTableCell>
                <StyledTableCell >Description</StyledTableCell>
                <StyledTableCell >Select</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data_highcharts != null ?
                data_highcharts.variables_names.map((row, index) =>{
                    const isItemSelected = isSelected(row);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return <React.Fragment key={index}>
                        <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <StyledTableCell>
                        </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {row}
                            </StyledTableCell>
                            <StyledTableCell>
                                {data_highcharts.standard_names[index]}
                            </StyledTableCell>
                            <StyledTableCell padding="checkbox">
                                  <Checkbox
                                      color="primary"
                                      checked={isItemSelected}
                                      // onChange={(e) => handleChange()}
                                      onChange={(event) => handleClick(event, row)}
                                      inputProps={{
                                        'aria-labelledby': labelId,
                                      }}
                                    />
                              </StyledTableCell>
                        </StyledTableRow>
                    </React.Fragment>
                        
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

export default TableInformationProfiles;
