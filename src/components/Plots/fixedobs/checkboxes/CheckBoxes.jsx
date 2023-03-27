import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
const CheckBoxes = () => {
    const state = useSelector(state=>state);
    const data_highcharts = state.dataHighchart;
    const [checkedList, setCheckedList] = useState({});
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        console.log(event.target.checked)
        console.log(event.target.id)
        setChecked(event.target.checked);
    };

    return (
        <div>
            <FormGroup>
            {
                
                    data_highcharts.table_info.map((value, index) => {
                    return <FormControlLabel key={index} control={<Checkbox  onChange={handleChange} id={value.name_data}/>} label={value.name_data} />
                })
                
            }
            </FormGroup>
        </div>
        
    );
}

export default CheckBoxes;
