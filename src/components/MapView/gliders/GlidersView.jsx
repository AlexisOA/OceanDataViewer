import React, {useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { getCoordinatesFromURL, getCoordinatesGlidersFromURL } from '../../../services/ThreddsService';
import { setStateLoading } from '../../../store/actions/LoadingActions';
import { setDataRoute } from '../../../store/actions/routeGliderActions';
import NavigationMenu from '../../Home/Navigation/NavigationMenu';
import EstocCatalogs from '../fixedobs/FixedObsCatalogs';
import MapViewEstoc from '../fixedobs/FixedObsMapView';
import GlidersCatalogs from './GlidersCatalogs';
import GlidersMapView from './GlidersMapView';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const GlidersView = () => {
    const [dataFile, setDataPopUp] = useState([]);
    const [fullDataset, setFullData] = useState(null);
    const state = useSelector(state=>state);
    const dispatch = useDispatch();

    useEffect(() => {
        window.history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function(event) {
            window.location.replace("/");
        });
    }, []);

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
        <div>
            <NavigationMenu/>
            <div className="container-fluid">
            <div className='row m-3'>
            <Tabs
                    defaultActiveKey="source"
                    id="uncontrolled-tab-example"
                >
                <Tab eventKey="source" title="Data Source Selection">
                    <div className="row m-3 bg-light border p-2 ">
                        <div className="col-sm-6 col-md-3 ">
                            <GlidersCatalogs send={obtainCoords}/>
                        </div>

                        {/* Map */}
                        <div className="col-sm-6 col-sm-offset-4 col-md-9 col-md-offset-3">
                            <GlidersMapView dataGlider={[]} fullData={fullDataset}/>
                        </div>
                    </div>
                </Tab>
            </Tabs>
            </div>

            


            </div>
        </div>
       
    );
}

export default GlidersView;
