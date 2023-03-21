import React, {useEffect, useState} from 'react';
import {getCSVFileFromNetcdf, getDataToForm, getDataToFormProfiles} from '../../../../../services/ThreddsService';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { setDataFile } from '../../../../../store/actions/highchartActions';
import FixedObsPlotsSwitch from './FixedObsPlotsSwitch';
import IconButton from '@mui/material/IconButton';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import InfoIcon from '@mui/icons-material/Info';
import GetAppIcon from '@mui/icons-material/GetApp';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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

    const data_highcharts = state.dataHighchart;
    const transferList_Data = state.transferListData;
    const dispatch = useDispatch();
    console.log("deee: ", data_highcharts)
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


    return (
        <div className='container'>
            {
                
                data_highcharts != null ?
                
                (
                    <div className='mt-3'>
                        
                            {
                                (data_highcharts.isprofile) ?
                                <div >
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
                                <div>
                                    {
                                        data_highcharts.table_info.map((value, idx) => {
                                            return (
                                            <section key={idx} className='row mb-3'>
                                                {
                                                value.show_data ?
                                                    (   
                                                        <div>
                                                        <h6>{value.Standard_name} ({value.Variable_name})</h6>
                                                        <FixedObsPlotsSwitch data={value} type_chart={value.type_chart}/>
                                                        <div className='justify-content-end'>

                                                            <IconButton aria-label="delete" size="small" color="primary" onClick={handleShowInfo}>
                                                                <InfoIcon />
                                                                <Modal
                                                                size="lg"
                                                                show={showInfo}
                                                                onHide={handleCloseInfo}
                                                                aria-labelledby="contained-modal-title-vcenter"
                                                                centered>
                                                                    <Modal.Header closeButton>
                                                                    <Modal.Title id="contained-modal-title-vcenter">Information</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>{value.description}</Modal.Body>
                                                                </Modal>
                                                            </IconButton>

                                                            <IconButton aria-label="delete" size="small" color="primary"
                                                            onClick={() => {
                                                                alert('button download');
                                                            }}> 
                                                                <GetAppIcon />
                                                            </IconButton>
                                                            <IconButton aria-label="delete" size="small" color="primary"
                                                            onClick={handleShowZoom}>
                                                                <ZoomOutMapIcon/>
                                                                <Modal
                                                                size="lg"
                                                                show={showZoom}
                                                                onHide={handleCloseZoom}
                                                                aria-labelledby="contained-modal-title-vcenter"
                                                                centered>
                                                                    <Modal.Header closeButton>
                                                                    <Modal.Title id="contained-modal-title-vcenter">Plot</Modal.Title>
                                                                    </Modal.Header>
                                                                    <Modal.Body>
                                                                        {<FixedObsPlotsSwitch data={value} type_chart={value.type_chart}/>}
                                                                    </Modal.Body>
                                                                </Modal>
                                                            </IconButton>

                                                        </div>
                                                        </div>
                                                    )
                                                    :
                                                    null
                                                }
                                            </section>)
                                        })
                                    }
                                </div>
                            
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
