import React, {useEffect, useState} from 'react';
import FixedObsHighcharts from '../../../../Plots/fixedobs/plotshighcharts/FixedObsHighcharts';
import FixedObsHighStock from '../../../../Plots/fixedobs/plotshighcharts/FixedObsHighStock';
import FixedObsHighStockMeteo from '../../../../Plots/fixedobs/plotshighcharts/FixedObsHighStockMeteo';
import FixedObsHighStockMultiple from '../../../../Plots/fixedobs/plotshighcharts/FixedObsHighStockMultiple';
import FixedObsHighStockSediments from '../../../../Plots/fixedobs/plotshighcharts/FixedObsHighStockSediments';
import FixedObsProfiles from '../../../../Plots/fixedobs/plotshighcharts/FixedObsProfiles';

const FixedObsPlotsSwitch = ({data, type_chart}) => {


    return (

        <div>
            <div>
                {data != null ? (
                value.type_chart === "basic" ? (
                    <div className='card text-center  mt-5'>
                        <FixedObsHighcharts data={value}/>
                    </div>
                ) 
                : value.type_chart === "complex" && value.sediments_info.length > 0 ? (
                    <div className='card text-center  mt-5'>
                        <FixedObsHighStockSediments data={value}/>
                    </div>
                )
                : value.type_chart == "multiple" ? (
                    <div className='card text-center  mt-5'>
                        <FixedObsHighStockMultiple data={value}/>
                    </div>
                )
                : value.type_chart == "meteo" ? (
                    <div className='card text-center  mt-5'>
                        <FixedObsHighStockMeteo data={value}/>
                    </div>
                )
                : value.type_chart == "profile" ? (
                    <div className='card text-center  mt-5'>
                        <FixedObsProfiles data={value}/>
                    </div>
                )
                : 
                (
                    <div className='card text-center  mt-5'>
                        <FixedObsHighStock data={value}/>
                    </div>
                )
                ) : (
                null
                )}
            </div>
        </div>

    );
}

export default FixedObsPlotsSwitch;
