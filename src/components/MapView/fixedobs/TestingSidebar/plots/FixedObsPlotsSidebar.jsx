import React, {useEffect, useState} from 'react';
import {getCSVFileFromNetcdf, getDataToForm, getDataToFormProfiles} from '../../../../../services/ThreddsService';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { setDataFile } from '../../../../../store/actions/highchartActions';
import FixedObsPlotsSwitch from './FixedObsPlotsSwitch';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { makeStyles } from "@material-ui/core";
import { createTheme } from '@mui/material/styles';
const useStyles = makeStyles(theme => ({
    root: {
      "& .css-10nakn3-MuiModal-root-MuiPopover-root-MuiMenu-root": {
        zIndex: "2000"
      }
    }
  }));


const theme = createTheme({
    overrides: {
        MuiModal:{
            root: {
                zIndex: 2000,
            }
        }
    }
});

const FixedObsPlotsSidebar = ({url, url_download, is_profile}) => {
    const state = useSelector(state=>state);
    const [loading, setLoading] = useState(true);
    const [datasetProfile, setDatasetProfiles] = useState(null);
    let dataset = []
    const [loadingCSV, setLoadingCSV] = useState(false);
    const [loadingNetCDF, setLoadingNetCDF] = useState(false);
    const [loadingLinearProgress, setLinearProgress] = useState(false);
    const [disabledBtnLoadings, setDisabledBtnLoadings] = useState(false);

    const [showInfo, setShowInfo] = useState(false);
    const handleCloseInfo = () => setShowInfo(!showInfo);
    const handleShowInfo = () => setShowInfo(!showInfo);

    const [showZoom, setShowZoom] = useState(false);
    const handleCloseZoom = () => setShowZoom(!showZoom);
    const handleShowZoom = () => setShowZoom(!showZoom);


    const [checked, setChecked] = useState(false);
    const [stateSwitchs, setStateSwitchs] = useState(null);
    let switchState = {};

    const [variable, setVariable] = useState('');


    const data_highcharts = state.dataHighchart;
    const transferList_Data = state.transferListData;
    const dispatch = useDispatch();
    console.log("deee: ", data_highcharts)

    const classes = useStyles();


    useEffect(() => {
        if(url != null){
            console.log(is_profile)
            if(is_profile){
                console.log("profile")
                obtainDataFormProfiles(url)
            }else{
                console.log("not profile")
                obtainDataForm(url)
            }
        }
    }, [url]);

    const obtainDataForm = (url) => {
        getDataToForm(url, url_download)
        .then((response) => {
            if(response.status === 200){
                console.log(response.data)
                dispatch(setDataFile(response.data))
            }
        })
        .catch((error) => {
            dispatch(setDataFile(null));
            setLoading(false);
        })
    }

    const obtainDataFormProfiles = (url) => {
        getDataToFormProfiles(url, url_download)
        .then((response) => {
            if(response.status === 200){
                console.log(response.data)
                dispatch(setDataFile(response.data))
            }
        })
        .catch((error) => {
            dispatch(setDataFile(null));
            setLoading(false);
        })
        
    }

    const downloadCSV = (url) => {
        setLinearProgress(true)
        getCSVFileFromNetcdf(url)
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${data_highcharts.name}.csv`);
            document.body.appendChild(link);
            link.click();
            setLinearProgress(false)
            // dispatch(setSizeWindow(window.innerWidth, window.innerHeight))

        })
        .catch((error) => {
            console.log("Error al descargar fichero", error)
            setLinearProgress(false)

        })
    }

    const downloadNetCDF = () => {
        setLinearProgress(true)
        setTimeout(() => setLinearProgress(false), 2000);
        // dispatch(setSizeWindow(window.innerWidth, window.innerHeight))
    }

    const setDatasetProfile = () => {
        console.log("hola")
        dataset = []
        data_highcharts.variables_names.map((value, idx) => {
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
            dataset.push(data_obj);
            
        })
        console.log("datasr: ",dataset)
    }

    const handleChange = (event) => {
        console.log("event", event.target.value)
        setVariable(event.target.value);
      };

    const handleChangeSwitch = (idx, event, checked) => {
        console.log(idx)
        console.log(event)
        console.log(checked)
        switchState['switch-' + idx] = checked;
    };

    const setStateSwitch = () => {
        switchState = {};
        data_highcharts.table_info.map((val, index) => {
            switchState['switch-' + index] = false;
        })
    };


    return (
        <div className='container'>
            {
                
                data_highcharts != null ?
                
                (
                    <div className='col mt-3'>
                        
                            {
                                (data_highcharts.isprofile) ?
                                <div className='row'>
                                    {
                                        setDatasetProfile()
                                    }
                                    { 
                                     dataset.length > 0 ? 

                                     data_highcharts.standard_names.map((value, index) => {
                                        return (
                                            <div key={index} className='mb-3'>
                                            <h6>{value} ({data_highcharts.variables_names[index]})</h6>
                                            <FixedObsPlotsSwitch data={dataset[index]} type_chart={dataset[index].type_chart}/>
                                            </div>)
                                    })
                                     :
                                     null      
                                    }
                                </div>
                                :
                                <div className='row mt-3'>
                                    <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">Variables</InputLabel>
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
                                            data_highcharts.table_info.map((value, idx) => {
                                                if(value.show_data){
                                                    return  <MenuItem key={idx} value={idx}>{value.Standard_name}</MenuItem>
                                                }
                                            })
                                        }
                                    </Select>
                                </FormControl>   
                                </Box>
                                </div>
                            
                            }
                            {
                                variable != 2000 ?
                                    data_highcharts.table_info.map((value, idx) => {
                                        if(idx === variable){
                                            return  <div className='row' key={idx}><FixedObsPlotsSwitch  data={value} type_chart={value.type_chart}/></div>
                                        }
                                    })
                                :
                                null
                                
                            }
                    </div>
                )
                :
                loading ?
                (<div className='d-flex align-items-center justify-content-center align-self-center' style={{minHeight: "100vh"}}>
                    <CircularProgress/>
                </div>)
                :
                <div>
                    <h4 className='d-flex align-items-center justify-content-center align-self-center mt-5'>Not implemented yet</h4>
                </div>
            }
        </div>


        
    );
}

export default FixedObsPlotsSidebar;
