import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getCoordinatesFromURL } from '../../../services/ThreddsService';
import EstocCatalogs from '../fixedobs/FixedObsCatalogs';
import MapViewEstoc from '../fixedobs/FixedObsMapView';

const GlidersView = () => {
    const [dataFile, setDataPopUp] = useState(null);
    function obtainCoords(is_file, url, url_download) {
        (is_file) ?
            obtainCoordinatesNetCDF(url, url_download)
            : 
            console.log()
    }

    const obtainCoordinatesNetCDF = (url, url_download) => {
        //Disable tabs before click to file
        //here it need remove data from status data plots
        getCoordinatesFromURL(url, url_download)
            .then((response) => {
                console.log(response.data)
                setDataPopUp(response.data);
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'warning',
                    title: 'Plots under Construction...',
                    text: 'We are working in this file',
                    confirmButtonColor:"#FFA233"
                  })
            })
    };
    return (
        <div className="container-fluid">

            <div className="row m-3">
                <div className="col-12">
                    <h1 className="text-center">Fixed Observatories</h1>
                </div>
            </div>

            <div className="row m-3 bg-light border p-2 ">
                <div className="col-sm-6 col-md-3 ">
                    <EstocCatalogs send={obtainCoords} baselayer={"gliders"}/>
                </div>
            
                {/* Map */}
                <div className="col-sm-6 col-sm-offset-4 col-md-9 col-md-offset-3">
                    <MapViewEstoc filesData={dataFile}/>
                </div>
            </div>

            
        </div>
    );
}

export default GlidersView;
