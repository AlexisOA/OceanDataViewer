import React, {useEffect, useState} from 'react';
import {getCSVFileFromNetcdf, getDataToForm, getDataToFormProfiles} from '../../../services/ThreddsService';
import '../fixedobs/FixedObsPlots.css';
import TableInformation from './table_info/TableInformation';
import TransferList from './List/TransferList';
import FixedObsHighcharts from './plotshighcharts/FixedObsHighcharts';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector, useDispatch } from 'react-redux';
import { setDataFile, setTranferlistChoose } from '../../../store/actions/highchartActions';
import FixedObsHighStock from './plotshighcharts/FixedObsHighStock';
import LoadingButton from '@mui/lab/LoadingButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { setSizeWindow } from '../../../store/actions/windowActions';
import FixedObsHighStockMultiple from './plotshighcharts/FixedObsHighStockMultiple';
import FixedObsHighStockSediments from './plotshighcharts/FixedObsHighStockSediments';
import FixedObsHighStockMeteo from './plotshighcharts/FixedObsHighStockMeteo';
import TransferListProfiles from './List/TransferListProfiles';
import TableInformationProfiles from './table_info/TableInformationProfiles';
import FixedObsProfiles from './plotshighcharts/FixedObsProfiles';
import IconButton from '@mui/material/IconButton';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import InfoIcon from '@mui/icons-material/Info';
import GetAppIcon from '@mui/icons-material/GetApp';
import { data } from 'jquery';
import { CheckBox } from '@mui/icons-material';
import CheckBoxes from './checkboxes/CheckBoxes';
import TableInformationTest from './table_info/TableInformationTest';

const FixedObsPlots = ({url, url_download, is_profile}) => {
    const state = useSelector(state=>state);
    const [loading, setLoading] = useState(true);

    const [loadingCSV, setLoadingCSV] = useState(false);
    const [loadingNetCDF, setLoadingNetCDF] = useState(false);
    const [loadingLinearProgress, setLinearProgress] = useState(false);
    const [disabledBtnLoadings, setDisabledBtnLoadings] = useState(false);

    const [loadingProfile, setLoadingProfile] = useState(false);

    const data_highcharts = state.dataHighchart;
    const transferList_Data = state.transferListData;


    console.log(transferList_Data)
    const dispatch = useDispatch();

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
        const name = url.substring(url.lastIndexOf("/")+1).replace(".nc", "")
        setLoadingProfile(true)
        setLinearProgress(true)
        getCSVFileFromNetcdf(url)
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            // link.setAttribute('download', `${data_highcharts.name}.csv`);
            link.setAttribute('download', `${name}.csv`);
            document.body.appendChild(link);
            link.click();
            setLoadingProfile(false)
            setLinearProgress(false)
            // dispatch(setSizeWindow(window.innerWidth, window.innerHeight))

        })
        .catch((error) => {
            console.log("Error al descargar fichero", error)
            setLoadingProfile(false)
            setLinearProgress(false)

        })
    }

    const downloadNetCDF = () => {
        setLoadingProfile(true)
        setLinearProgress(true)
        setTimeout(() => {
            setLoadingProfile(false);
            setLinearProgress(false);
          }, "2100");
        // dispatch(setSizeWindow(window.innerWidth, window.innerHeight))
    } 


    return (
        <div className='container'>
            {
                data_highcharts != null ?
                (
                    <div>
                        <div>
                            {
                                (data_highcharts.isprofile) ?
                                <div className='container-fluid mt-2 mb-4'>
                                    <div className="row">
                                        <div className="justify-content-left col-sm-8 col-md-5">
                                            <TableInformationProfiles/>
                                        </div>
                                        <div className='justify-content-right col-sm-8 col-md-6 mx-5'>
                                            <div className='container-fluid mt-3'>
                                                <IconButton  aria-label="delete" size="small" >
                                                < InfoIcon />
                                                    <h5 className='mx-3 mt-2'>Information</h5>
                                                </IconButton>
                                                <p>{data_highcharts.table_info.profile0[0].description}</p>
                                            </div>
                                            <div className='container-fluid mt-3'>
                                                <IconButton aria-label="download" size="small" className='mt-4'> 
                                                    <GetAppIcon />
                                                    <h5 className='mx-3 mt-2'>Download Files</h5>
                                                </IconButton>
                                            </div>
                                                    <div className='row justify-content-left mt-2'>
                                                            {data_highcharts.url.map((url, index) =>{
                                                                return (<div key={index} className='mb-2'>
                                                                    <p className='mb-3'>
                                                                        {
                                                                            (data_highcharts.isprofile) ? 
                                                                            url.substring(url.lastIndexOf("/")+1) + " (" + data_highcharts.table_info["profile" + index][0].time + ")"
                                                                            :
                                                                            url.substring(url.lastIndexOf("/")+1)
                                                                        }
                                                                    </p>
                                                                        <LoadingButton
                                                                            className='mx-3 my-1 justify-content-center'
                                                                            sx={{ border:  1}}
                                                                            size="medium"
                                                                            onClick={downloadNetCDF}
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
                                                                            onClick={() => downloadCSV(url)}
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
                                            { loadingLinearProgress ?
                                            <LinearProgress className='mt-3'/>
                                            :
                                            null
                                            }
                                        
                                                        </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                                :
                                <div className='container-fluid mt-2 mb-4'>
                                    <div className="row">
                                        <div className="justify-content-left col-sm-8 col-md-5 ">
                                            <TableInformation/>
                                        </div>
                                        <div className="justify-content-right col-sm-8 col-md-6 mx-5">
                                            <div className='container-fluid mt-3'>
                                                <IconButton  aria-label="delete" size="small" >
                                                    <InfoIcon />
                                                    <h5 className='mx-3 mt-2'>Information</h5>
                                                    
                                                </IconButton>
                                                <p>{data_highcharts.table_info[0].description}</p>
                                            </div>
                                            <div className='container-fluid mt-3'>
                                                <IconButton aria-label="download" size="small" className='mt-2'> 
                                                    <GetAppIcon />
                                                    <h5 className='mx-3 mt-2'>Download Files</h5>
                                                </IconButton>
                                            </div>
                                            
                                                        <div className='row justify-content-left mt-2'>
                                                            {data_highcharts.url.map((url, index) =>{
                                                                return (<div key={index} className='mb-2'>
                                                                    <p className='mb-3'>
                                                                        {
                                                                            (data_highcharts.isprofile) ? 
                                                                            url.substring(url.lastIndexOf("/")+1) + " (" + data_highcharts.table_info["profile" + index][0].time + ")"
                                                                            :
                                                                            url.substring(url.lastIndexOf("/")+1)
                                                                        }
                                                                    </p>
                                                                        <LoadingButton
                                                                            className='mx-3'
                                                                            sx={{ border:  1}}
                                                                            size="medium"
                                                                            onClick={downloadNetCDF}
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
                                                                            onClick={() => downloadCSV(url)}
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
                                            { loadingLinearProgress ?
                                            <LinearProgress className='mt-3'/>
                                            :
                                            null
                                            }
                                        
                                                        </div>
                                        </div>
                                    </div>
                                </div>
                                
                            
                            }
                        </div>
                        

                        <div className="row">
                            <div className='mt-5'>
                                {
                                    
                                    transferList_Data.length > 0 ?
                                    
                                    (
                                        transferList_Data.map((value, index) => {
                                            if(value.type_chart == "basic"){
                                                return (<div key={index} className='card text-center  mt-5'>
                                                        {<FixedObsHighcharts data={value}/>}
                                                    </div>)
                                            }else if(value.type_chart == "complex" && value.sediments_info.length > 0){
                                                return (<div key={index} className='card text-center  mt-5'>
                                                        {<FixedObsHighStockSediments data={value}/> }
                                                    </div>)
                                            }else if(value.type_chart == "multiple"){
                                                return (<div key={index} className='card text-center  mt-5'>
                                                    <FixedObsHighStockMultiple data={value}/>
                                                </div>)
                                                
                                            }else if(value.type_chart == "meteo"){
                                                return (<div key={index} className='card text-center  mt-5'>
                                                    <FixedObsHighStockMeteo data={value}/>
                                                </div>)
                                                
                                            }
                                            else if(value.type_chart == "profile"){
                                                return (<div key={index} className='card text-center  mt-5'>
                                                    {/* <FixedObsHighStockMeteo data={value}/> */}
                                                    <FixedObsProfiles data={value}/>
                                                </div>)
                                                
                                            }else{
                                                return (<div key={index} className='card text-center  mt-5'>
                                                    <FixedObsHighStock data={value}/>
                                                </div>)
                                            }
                                            
                                            
                                        })
                                    )
                                    :
                                    null
                                }
                            </div>
                        </div>
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

export default FixedObsPlots;
