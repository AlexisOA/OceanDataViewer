import React, {useEffect, useState} from 'react';
import {getDataToForm} from '../../../services/ThreddsService';
import '../fixedobs/FixedObsPlots.css';
import TableInformation from './table_info/TableInformation';
import TransferList from './List/TransferList';
import FixedObsHighcharts from './plotshighcharts/FixedObsHighcharts';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { setDataFile } from '../../../store/actions/highchartActions';
import FixedObsHighStock from './plotshighcharts/FixedObsHighStock';

const FixedObsPlots = ({url}) => {
    const state = useSelector(state=>state);
    const data_highcharts = state.dataHighchart;
    
    const dispatch = useDispatch();

    useEffect(() => {

        console.log("en el useeffect")
        if(url != null){
            console.log("en el if")
            obtainDataForm(url)
        }
    }, [url]);

    const obtainDataForm = (url) => {
        getDataToForm(url)
        .then((response) => {
            if(response.status === 200){
                console.log(response.data)
                dispatch(setDataFile(response.data))
            }
        })
        .catch((error) => alert(`Error loading graphics: ${error}`))
        
    }

    return (
        <div className='container'>
            {
                data_highcharts != null ?
                (
                        <div className="row">
                            <div className="col-sm-8 col-md-4 ">
                                <TableInformation/>
                            </div>
                            <div className="col-sm-4 col-md-6 align-self-center">
                                <TransferList/>
                            </div>
                            <Divider/>
                            <div className='mt-5'>
                                {

                                }
                                <FixedObsHighcharts/>
                                {/* <FixedObsHighStock/> */}
                            </div>
                        </div>
                )
                :
                <div className='d-flex align-items-center justify-content-center align-self-center' style={{minHeight: "100vh"}}>
                    <CircularProgress/>
                </div>
            }
        </div>


        
    );
}

export default FixedObsPlots;
