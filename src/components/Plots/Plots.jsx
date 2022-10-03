import React, {useState} from 'react';
import { getImageFromFile, getImageFromLocalFile } from '../../services/ThreddsService';
import "leaflet/dist/leaflet.css";
import { Popup } from "react-leaflet";
const Plots = ({fileName}) => {
    const [plot, setPlot] = useState(null);

    const obtainPlot = (fileName) => {
        // getImageFromFile()
        //     .then((response) => {
        //         if(response.status === 200){
        //             setPlot(response.data);
        //             console.log(response.data)
        //         }
        //     })
        //     .catch((error) => alert(`Error loading thredds catalog: ${error}`))

        getImageFromLocalFile(fileName)
            .then((response) => {
                if(response.status === 200){
                    setPlot(response.data);
                    console.log(response.data)
                    
                }
            })
            .catch((error) => alert(`Error loading thredds catalog: ${error}`))

        
    }



    return (
        <div>
            {
                plot != null ? 
                (   
                    <div>
                        <div>{fileName}</div>
                        <div>
                            <img src={`data:image/png;base64,${plot.base64Data}`} alt='graphic'/>
                        </div>
                    </div>
                    
                )
                :
                (   null
                
                )
                
            }
            <div onClick={() => obtainPlot(fileName)}>
                <button>Plot</button>
            </div>
            
        </div>
    );
}

export default Plots;
