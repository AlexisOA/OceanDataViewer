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
import { createTheme } from '@mui/material/styles';

import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import InfoIcon from '@mui/icons-material/Info';
import GetAppIcon from '@mui/icons-material/GetApp';
import IconButton from '@mui/material/IconButton';

import LoadingButton from '@mui/lab/LoadingButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import Modal from 'react-bootstrap/Modal';

import LinearProgress from '@mui/material/LinearProgress';

const FixedObsPlotsSidebar = ({url, url_download, is_profile}) => {
    const state = useSelector(state=>state);
    const [loading, setLoading] = useState(true);
    const [datasetProfile, setDatasetProfiles] = useState(null);
    let dataset = []

    const [variable, setVariable] = useState('');

    //Button for downloads
    const [loadingNc, setLoadingNc] = useState(false);
    const [loadingCsv, setLoadingCsv] = useState(false);

    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingLinearProgress, setLinearProgress] = useState(false);

    const [showZoom, setShowZoom] = useState(false);
    const handleCloseZoom = () => setShowZoom(!showZoom);
    const handleShowZoom = () => setShowZoom(!showZoom);

    const data_highcharts = state.dataHighchart;
    const transferList_Data = state.transferListData;
    const dispatch = useDispatch();
    console.log("deee: ", data_highcharts)

    function handleClickNc() {
        console.log("hola")
        setLoadingProfile(true)
        setLinearProgress(true)
        setTimeout(() => {
            setLoadingProfile(false);
            setLinearProgress(false);
          }, "2100");
    }

    const handleClickCSV = (url) => {
        const name = url.substring(url.lastIndexOf("/")+1)
        setLoadingProfile(true)
        setLinearProgress(true)
        getCSVFileFromNetcdf(url)
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${name}.csv`);
            document.body.appendChild(link);
            link.click();
            setLoadingProfile(false)
            setLinearProgress(false)
            // dispatch(setSizeWindow(window.innerWidth, window.innerHeight))

        })
        .catch((error) => {
            alert("Error al descargar fichero", error)
            setLoadingProfile(false)
            setLinearProgress(false)

        })
    }

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
    const setDatasetProfile = () => {
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
        setVariable(event.target.value);
    };

    return (
        <div className='container'>
            {
                
                data_highcharts != null ?
                
                (
                    <div className='col mt-3'>
                        
                            {
                                (data_highcharts.isprofile) ?
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
                                            style: {zIndex: 2000, whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'}
                                        }}
                                        >
                                        {
                                            data_highcharts.table_info.profile0.map((value, idx) => {
                                                return  <MenuItem key={idx} value={idx}>{value.long_name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>   
                                </Box>
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
                                    (!data_highcharts.isprofile) ?
                                        data_highcharts.table_info.map((value, idx) => {
                                            if(idx === variable){
                                                return  <div>
                                                            <div className='row' key={idx}>
                                                                <FixedObsPlotsSwitch  data={value} type_chart={value.type_chart}/>
                                                                <div className='d-flex mb-2 justify-content-end'>
                                                                    <IconButton
                                                                    aria-label="delete"
                                                                    size="small"
                                                                    style={{'color': 'black'}}
                                                                    onClick={handleShowZoom}>
                                                                        <ZoomOutMapIcon fontSize="inherit"/>
                                                                    </IconButton>
                                                                </div>

                                                                <div className='container-fluid mt-2'>
                                                                    <IconButton  aria-label="delete" size="small" >
                                                                        <InfoIcon />
                                                                        <h5 className='mx-3 mt-2'>Information</h5>
                                                                        
                                                                    </IconButton>
                                                                    <p>{value.description}</p>
                                                                </div>

                                                                <div className='container-fluid mt-2 mb-4'>
                                                                    <IconButton aria-label="download" size="small"> 
                                                                        <GetAppIcon />
                                                                        <h5 className='mx-3 mt-2'>Download File</h5>
                                                                    </IconButton>
                                                                    <div className='mt-2'>
                                                                        <p className='mb-3'>
                                                                            {
                                                                                data_highcharts.name
                                                                            }
                                                                            
                                                                        </p>
                                                                        <LoadingButton
                                                                            className='mx-1'
                                                                            sx={{ border:  1}}
                                                                            size="medium"
                                                                            onClick={handleClickNc}
                                                                            loadingPosition="end"
                                                                            disabled={loadingProfile}
                                                                            variant="outlined"
                                                                            color="primary"
                                                                            endIcon={<FileDownloadIcon />}
                                                                            href={data_highcharts.url_download[0]}
                                                                            >
                                                                            Download NC
                                                                        </LoadingButton>
                                                                        <LoadingButton
                                                                            sx={{ border:  1}}
                                                                            size="medium"
                                                                            onClick={() => handleClickCSV(data_highcharts.url[0])}
                                                                            loadingPosition="end"
                                                                            disabled={loadingProfile}
                                                                            variant="outlined"
                                                                            color="success"
                                                                            endIcon={<FileDownloadIcon />}
                                                                            >
                                                                            Download CSV
                                                                        </LoadingButton>
                                                                    </div>
                                                                </div>
                                                                { loadingLinearProgress ?
                                                                <div className='mt-2 mb-2'>
                                                                    <LinearProgress />
                                                                </div>
                                                                :
                                                                null
                                                                }
                                                            </div>
                                                            <div key={idx+1}>
                                                                <Modal
                                                                size="lg"
                                                                show={showZoom}
                                                                onHide={handleCloseZoom}
                                                                backdrop='static'
                                                                aria-labelledby="contained-modal-title-vcenter"
                                                                centered
                                                                >
                                                                    <Modal.Header closeButton>
                                                                    <Modal.Title id="contained-modal-title-vcenter">{data_highcharts.name}</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                    <FixedObsPlotsSwitch  data={value} type_chart={value.type_chart}/>
                                                                    </Modal.Body>
                                                                </Modal>
                                                            </div>
                                                        </div>
                                            }
                                            
                                        })
                                        :
                                        data_highcharts.table_info.profile0.map((value, idx) => {
                                            if(idx === variable){
                                                setDatasetProfile()
                                                return <div key={idx}>
                                                            <div className='row' >
                                                                <FixedObsPlotsSwitch  data={dataset[idx]} type_chart={dataset[idx].type_chart}/>
                                                                <div className='d-flex mb-2 justify-content-end'>
                                                                            <IconButton
                                                                            aria-label="delete"
                                                                            size="small"
                                                                            style={{'color': 'black'}}
                                                                            onClick={handleShowZoom}>
                                                                                <ZoomOutMapIcon fontSize="inherit"/>
                                                                            </IconButton>
                                                                </div>
                                                        
                                                                <div className='container-fluid mt-2'>
                                                                            <IconButton  aria-label="delete" size="small" >
                                                                                <InfoIcon />
                                                                                <h5 className='mx-3 mt-2'>Information</h5>
                                                                                
                                                                            </IconButton>
                                                                            <p>{value.description}</p>
                                                                </div>

                                                                <div className='container-fluid mt-2 mb-4'>
                                                                    <IconButton aria-label="download" size="small"> 
                                                                        <GetAppIcon />
                                                                        <h5 className='mx-3 mt-2'>Download Files</h5>
                                                                    </IconButton>
                                                                    {data_highcharts.url.map((url, index) =>{
                                                                        return (<div key={index} className='mb-2'>
                                                                            <p className='mb-3'>
                                                                                {
                                                                                    url.substring(url.lastIndexOf("/")+1) + " (" +
                                                                                    dataset[idx].dataset[index].time + ")"
                                                                                }
                                                                                
                                                                            </p>
                                                                            <LoadingButton
                                                                                    className='mx-1'
                                                                                    sx={{ border:  1}}
                                                                                    size="medium"
                                                                                    onClick={handleClickNc}
                                                                                    loadingPosition="end"
                                                                                    variant="outlined"
                                                                                    color="primary"
                                                                                    disabled={loadingProfile}
                                                                                    endIcon={<FileDownloadIcon />}
                                                                                    href={data_highcharts.url_download[index]}
                                                                                    >
                                                                                    Download NC
                                                                                </LoadingButton>
                                                                                <LoadingButton
                                                                                    sx={{ border:  1}}
                                                                                    size="medium"
                                                                                    onClick={() => handleClickCSV(url)}
                                                                                    loadingPosition="end"
                                                                                    variant="outlined"
                                                                                    color="success"
                                                                                    disabled={loadingProfile}
                                                                                    endIcon={<FileDownloadIcon />}
                                                                                    >
                                                                                    Download CSV
                                                                                </LoadingButton>
                                                                        </div>)
                                                                    })}
                                                                </div>
                                                                { loadingLinearProgress ?
                                                                <div className='mb-3'>
                                                                    <LinearProgress />
                                                                </div>
                                                                :
                                                                null
                                                                }
                                                            </div>
                                                            <div key={idx+1}>
                                                                <Modal
                                                                size="lg"
                                                                show={showZoom}
                                                                onHide={handleCloseZoom}
                                                                backdrop='static'
                                                                aria-labelledby="contained-modal-title-vcenter"
                                                                centered
                                                                >
                                                                    <Modal.Header closeButton>
                                                                    <Modal.Title id="contained-modal-title-vcenter">Vertical Profiles</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                    <FixedObsPlotsSwitch  data={dataset[idx]} type_chart={dataset[idx].type_chart}/>
                                                                    </Modal.Body>
                                                                </Modal>
                                                            </div>
                                                        </div>
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
