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
    const [loading, setLoading] = useState(true);

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
        getDataToForm(url)
        .then((response) => {
            if(response.status === 200){
                dispatch(setDataFile(response.data))
            }
        })
        .catch((error) => {
            dispatch(setDataFile(null));
            setLoading(false);
        })
        
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
                                    data_highcharts.type == 'basic' && transferList_Data.length > 0 ?
                                    (
                                        transferList_Data.map((value, index) => {
                                            return (<div key={index} className='card text-center  mt-5'>
                                                        {<FixedObsHighcharts data={value}/>}
                                                    </div>)
                                            
                                        })

                                        
                                    )
                                    :
                                    data_highcharts.type == 'complex' && transferList_Data.length > 0 ?
                                    (
                                        transferList_Data.map((value, index) => {
                                            return (<div key={index} className='card text-center  mt-5'>
                                                        {<FixedObsHighStock data={value}/>}
                                                    </div>)
                                            
                                        })

                                        
                                    )
                                    :
                                    null
                                }
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
