import React, {useEffect, useState} from 'react';
import {getCSVFileFromNetcdf, getDataToForm, getDataToFormProfiles} from '../../../../../services/ThreddsService';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { setDataFile } from '../../../../../store/actions/highchartActions';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FixedObsHighStock from '../../../../Plots/fixedobs/plotshighcharts/FixedObsHighStock';

const FixedObsPlotsSidebar = ({url, url_download, is_profile}) => {
    const state = useSelector(state=>state);
    const [loading, setLoading] = useState(true);

    const [loadingCSV, setLoadingCSV] = useState(false);
    const [loadingNetCDF, setLoadingNetCDF] = useState(false);
    const [loadingLinearProgress, setLinearProgress] = useState(false);
    const [disabledBtnLoadings, setDisabledBtnLoadings] = useState(false);


    const data_highcharts = state.dataHighchart;
    const transferList_Data = state.transferListData;

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


    return (
        <div className='container'>
            {
                data_highcharts != null ?
                (
                    <div className='mt-3'>
                            {
                            data_highcharts.table_info.map((value, idx) => {
                                return (
                                <section key={idx} className='row mb-3'>
                                    <h6>{value.Standard_name} ({value.Variable_name})</h6>
                                    <FixedObsHighStock data={value}/>
                                </section>)
                            })}
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
