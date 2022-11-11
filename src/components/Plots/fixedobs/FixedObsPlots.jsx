import React, {useEffect, useState} from 'react';
import {getCSVFileFromNetcdf, getDataToForm} from '../../../services/ThreddsService';
import '../fixedobs/FixedObsPlots.css';
import TableInformation from './table_info/TableInformation';
import TransferList from './List/TransferList';
import FixedObsHighcharts from './plotshighcharts/FixedObsHighcharts';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { setDataFile } from '../../../store/actions/highchartActions';
import FixedObsHighStock from './plotshighcharts/FixedObsHighStock';
import LoadingButton from '@mui/lab/LoadingButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { NoEncryptionGmailerrorredOutlined } from '@mui/icons-material';
import { setSizeWindow } from '../../../store/actions/windowActions';
const FixedObsPlots = ({url, url_download}) => {
    const state = useSelector(state=>state);
    const [loading, setLoading] = useState(true);

    const [loadingCSV, setLoadingCSV] = useState(false);
    const [loadingNetCDF, setLoadingNetCDF] = useState(false);


    const data_highcharts = state.dataHighchart;
    const transferList_Data = state.transferListData;

    const [dataChart, setDataChart] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if(url != null){
            obtainDataForm(url)
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

    const downloadCSV = (url) => {
        setLoadingCSV(true)
        getCSVFileFromNetcdf(url)
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${data_highcharts.name}.csv`);
            document.body.appendChild(link);
            link.click();
            setLoadingCSV(false)
            dispatch(setSizeWindow(window.innerWidth, window.innerHeight))

        })
        .catch((error) => {
            console.log("Error al descargar fichero", error)
            setLoadingCSV(false)

        })
    }

    const downloadNetCDF = () => {
        setLoadingNetCDF(true)
        setTimeout(() => setLoadingNetCDF(false), 2000);
        dispatch(setSizeWindow(window.innerWidth, window.innerHeight))
    }


    return (
        <div className='container'>
            {
                data_highcharts != null ?
                (
                    <div>
                        <div className="row">
                            <div className="col-sm-8 col-md-4 ">
                                <TableInformation/>
                            </div>

                            <div className="col-sm-4 col-md-6 align-self-center">
                                <TransferList/>
                            </div>

                            <Divider/>
                        </div>

                        <div className='row justify-content-left mt-4  text-center'>
                            <div className='col-2'>
                                {/* <button type="submit" className="btn btn-success" onClick={() => downloadCSV(data_highcharts.url)}>Download CSV</button> */}
                                <LoadingButton
                                    sx={{ border:  1}}
                                    size="medium"
                                    onClick={() => downloadCSV(data_highcharts.url)}
                                    loading={loadingCSV}
                                    loadingPosition="end"
                                    variant="outlined"
                                    color="success"
                                    endIcon={<FileDownloadIcon />}
                                    >
                                    Download CSV
                                    </LoadingButton>
                            </div>
                            <div className='col-2'>
                                <LoadingButton
                                    sx={{ border:  1}}
                                    size="medium"
                                    loading={loadingNetCDF}
                                    onClick={() => downloadNetCDF()}
                                    loadingPosition="end"
                                    variant="outlined"
                                    color="primary"
                                    endIcon={<FileDownloadIcon />}
                                    href={data_highcharts.url_download}
                                    >
                                    Download NC
                                </LoadingButton>
                            {/* <a className="btn btn-primary" href={data_highcharts.url_download} role="button">Download NetCDF</a> */}
                            </div>
                            
                        </div>

                        <div className="row">
                            <div className='mt-5'>
                                {
                                    transferList_Data.length > 0 ?
                                    (
                                        console.log("TransferList", transferList_Data),
                                        transferList_Data.map((value, index) => {
                                            if(value.type_chart == "basic"){
                                                return (<div key={index} className='card text-center  mt-5'>
                                                        {<FixedObsHighcharts data={value}/>}
                                                    </div>)
                                            }else if(value.type_chart == "complex"){
                                                return (<div key={index} className='card text-center  mt-5'>
                                                        {<FixedObsHighStock data={value}/>}
                                                    </div>)
                                            }else{
                                                return (<div key={index} className='card text-center  mt-5'>
                                                       Estamos ante un gráfico múltiple
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
