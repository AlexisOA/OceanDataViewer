import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InfoIcon from '@mui/icons-material/Info';
import Form from 'react-bootstrap/Form';
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Button from 'react-bootstrap/Button';
import { getDatasetGliderFromVariableName } from '../../../services/ThreddsService';
import { setDataGliderVariable } from '../../../store/actions/dataGliderVariablesActions';
import { setDataGliderVariableLoading } from '../../../store/actions/LoadingGliderVariableActions';
import GetAppIcon from '@mui/icons-material/GetApp';
import LoadingButton from '@mui/lab/LoadingButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const GlidersVariables = ({fullData}) => {
    const dispatch = useDispatch();
    const [variable, setVariable] = useState('');
    
    const [dateInit, setDateInit] = useState(fullData.USV_DATA[4].date_picker[0]);
    const [dateFin, setDateFin] = useState('');

    const [stateButton, setStateButton] = useState(true);
    const [loading, setLoading] = useState(false);
    console.log("aaaa", fullData)
    function handleClickNc() {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
          }, "2100");
    }
    useEffect(() => {
        if(dateFin === ''){
            const dateFinish = new Date(fullData.USV_DATA[4].date_picker[0].replaceAll("-", "/"));
            const next_date = new Date(dateFinish.setDate(dateFinish.getDate() + 30));
            var dateString = new Date(next_date.getTime() - (next_date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
            const dateFinSplited = fullData.USV_DATA[4].date_picker[1].split("-")
            const dateFinFormated = new Date(dateFinSplited[0], dateFinSplited[1]-1, dateFinSplited[2])
            if(next_date.getTime() > dateFinFormated.getTime()){
                setDateFin(fullData.USV_DATA[4].date_picker[1])
            }else{
                setDateFin(dateString)
            }
        }
    }, []);

    const handleChange = (event) => {
        setVariable(event.target.value);
        setStateButton(false);
    };
    

    const handleClick = () => {
        dispatch(setDataGliderVariable(null))
        dispatch(setDataGliderVariableLoading(true))
        getDatasetFromVariable();
    };
    const getDatasetFromVariable = () => {
        getDatasetGliderFromVariableName(fullData.USV_DATA[3].url, variable, dateInit, dateFin)
        .then((response) => {
            if(response.status === 200){
                dispatch(setDataGliderVariable(response.data))
                dispatch(setDataGliderVariableLoading(false))
            }
        })
        .catch((error) => {
          console.log("Error to load dataset", error)
          dispatch(setDataGliderVariableLoading(false))
        })
        
      }

    const handleDateStart = (value) => {
        const date = new Date(value.replaceAll("-", "/"));
        const next_date = new Date(date.setDate(date.getDate() + 30));
        // Date string format
        var dateString = new Date(next_date.getTime() - (next_date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];
        const dateFinSplited = fullData.USV_DATA[4].date_picker[1].split("-")
        const dateFinFormated = new Date(dateFinSplited[0], dateFinSplited[1]-1, dateFinSplited[2])
        if(next_date.getTime() > dateFinFormated.getTime()){
            setDateFin(fullData.USV_DATA[4].date_picker[1])
        }else{
            setDateFin(dateString)
        }
        setDateInit(value)
    };


    return (
        <div className='container'>
            <div className='col mt-3'>
                <div className='container-fluid mt-4'>
                    <IconButton  aria-label="delete" size="small"  color='inherit'>
                        <InfoIcon />
                        <h6 className='mx-2 mt-2'>Information</h6>
                        
                    </IconButton>
                    <p>{fullData.USV_DATA[3].summary}.
                        <br/><b>Name:</b> {fullData.USV_DATA[3].name}
                        <br/><b>Date start:</b> {fullData.USV_DATA[3].date_start}
                        <br/><b>Date end:</b> {fullData.USV_DATA[3].date_end}
                    </p>
                    
                </div>
                <div className='container-fluid mt-4'>
                <IconButton  aria-label="delete" size="small"  color='inherit'>
                    <ListIcon/>
                    <h6 className='mx-2 mt-2'>Select variable</h6>
                </IconButton>
                </div>
                    
                <div className='row mt-1'>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Variable</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={variable}
                            label="Variables"
                            onChange={handleChange}
                            MenuProps={{
                                style: {zIndex: 2000}
                            }}
                            >
                            {
                                fullData.USV_DATA[1].data.names.map((value, idx) => {
                                    return  <MenuItem key={idx} value={value.variable_name}>{value.standard_name}</MenuItem>
                                })
                            }
                            </Select>
                        </FormControl>   
                    </Box>
                </div>

                <div className='container-fluid mt-4'>
                    <IconButton  aria-label="delete" size="small"  color='inherit'>
                        <CalendarMonthIcon/>
                        <h6 className='mx-2 mt-2'>Select date</h6>
                    </IconButton>
                </div>

                <div className='row mt-1'>
                    <div className='col-6'>
                        <Form>
                            <Form.Group className="mb-3" controlId="startDate">
                                <Form.Label>Start date</Form.Label>
                                <Form.Control type="date" name="startDate" placeholder="Write date" value={dateInit} onChange={(e) => handleDateStart(e.target.value)} min={fullData.USV_DATA[4].date_picker[0]} max={fullData.USV_DATA[4].date_picker[1]}/>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className='col-6'>
                        <Form>
                            <Form.Group className="mb-3" controlId="endDate">
                                <Form.Label>End date</Form.Label>
                                <Form.Control type="date" name="endDate" placeholder="Write date" value={dateFin} min={dateInit} max={dateFin} onChange={(e) => setDateFin(e.target.value)} />
                            </Form.Group>
                        </Form>
                    </div>
                
                </div>
                <div><p>Note: A maximum of one month can be chosen from the start date.</p></div>
                <div className='d-flex mt-3 align-items-center justify-content-right align-self-center'>
                <Button
                    variant="primary"
                    disabled={stateButton}
                    onClick={() => handleClick()}
                    style={{'justifyContent': 'right'}}
                    >
                     Generate Plot
                    </Button>
                </div>
                <div className='container-fluid mt-4'>
                    <IconButton  aria-label="delete" size="small"  color='inherit'>
                        <GetAppIcon />
                        <h5 className='mx-3 mt-2'>Download File</h5>
                    </IconButton>
                    <div className='mt-2 d-flex align-items-center justify-content-center align-self-center'>
                        <LoadingButton
                            sx={{ border:  1}}
                            size="medium"
                            onClick={handleClickNc}
                            loadingPosition="end"
                            variant="outlined"
                            loading={loading}
                            color="primary"
                            endIcon={<FileDownloadIcon />}
                            href={fullData.USV_DATA[3].url_download}
                            >
                            Download NC
                        </LoadingButton>
                    </div>
                    
                    
                </div>
            </div>
        </div>


        
    );
}

export default GlidersVariables;
