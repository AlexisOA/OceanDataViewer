import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getCoordinatesFromURL, getCoordinatesGlidersFromURL } from '../../../services/ThreddsService';
import { setStateLoading } from '../../../store/actions/LoadingActions';
import { setDataRoute } from '../../../store/actions/routeGliderActions';
import EstocCatalogs from '../fixedobs/FixedObsCatalogs';
import MapViewEstoc from '../fixedobs/FixedObsMapView';
import GlidersCatalogs from './GlidersCatalogs';
import GlidersMapView from './GlidersMapView';

const GlidersView = () => {
    const [dataFile, setDataPopUp] = useState([]);
    const [fullDataset, setFullData] = useState(null);
    const state = useSelector(state=>state);
    const dispatch = useDispatch();
    function obtainCoords(is_file, url, url_download) {
        console.log(url)
        if(is_file){
            setFullData(null);
            obtainCoordinatesNetCDF(url);
        }
    }

    const obtainCoordinatesNetCDF = (url) => {
        //Disable tabs before click to file
        //here it need remove data from status data plots
        dispatch(setStateLoading(true))
        // dispatch(setDataRoute(null))
        getCoordinatesGlidersFromURL(url)
            .then((response) => {
                console.log(response.data);
                setFullData(response.data);
                // dispatch(setDataRoute(response.data))
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
                    <h1 className="text-center">Autonomous systems</h1>
                </div>
            </div>

            <div className="row m-3 bg-light border p-2 ">
                <div className="col-sm-6 col-md-3 ">
                    <GlidersCatalogs send={obtainCoords}/>
                </div>
            
                {/* Map */}
                <div className="col-sm-6 col-sm-offset-4 col-md-9 col-md-offset-3">
                    <GlidersMapView dataGlider={[]} fullData={fullDataset} dataHighStock={null}/>
                </div>
            </div>

            
        </div>
    );
}

export default GlidersView;
