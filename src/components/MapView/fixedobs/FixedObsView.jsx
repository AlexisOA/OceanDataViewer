import React, {useState, useEffect } from 'react';
import { getCoordinatesFromURL, getCoordinatesProfilesFromURL } from '../../../services/ThreddsService';
import EstocCatalogs from './FixedObsCatalogs';
import MapViewEstoc from './FixedObsMapView';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectTab, getStatusPlotTab, getStatusProductTab } from '../../../store/actions/tabActions';
import FixedObsPlots from '../../Plots/fixedobs/FixedObsPlots';
import { setDataFile, setTranferlistChoose } from '../../../store/actions/highchartActions';
import Swal from 'sweetalert2';
import { setSizeWindow } from '../../../store/actions/windowActions';

const EstocView = () => {
    const [dataFile, setDataPopUp] = useState(null);
    // const [selectTab, setSelectTab] = useState("source");
    const state = useSelector(state=>state);
    const statusPlot = state.statusPlotTab;
    const statusProduct = state.statusProductTab;
    const selectTab = state.statusSelect;

    const dispatch = useDispatch();

    useEffect(() => {
        window.history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function(event) {
            window.location.replace("/");
        });

        function handleResize() {
            console.log("resizing event");
            dispatch(setSizeWindow(window.devicePixelRatio, window.innerHeight))
        }
        window.addEventListener('resize', handleResize);
        return _ => {
            window.removeEventListener('resize', handleResize)
        };

    }, []);

    const divider_style = {
        borderRight: "1px dashed #333"
    }

    function obtainCoords(is_file, url, url_download, is_profile) {
        (is_file) ?
            (is_profile) ?
                obtainCoordinatesProfilesNetCDF(url, url_download)
                :
                obtainCoordinatesNetCDF(url, url_download)
            : 
            console.log()
    }

    const obtainCoordinatesNetCDF = (url, url_download) => {
        //Disable tabs before click to file
        dispatch(getStatusProductTab(true));
        dispatch(getStatusPlotTab(true));
        //here it need remove data from status data plots
        dispatch(setDataFile(null))
        dispatch(setTranferlistChoose([]))
        getCoordinatesFromURL(url, url_download)
            .then((response) => {
                console.log("a ver: ")
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

    const obtainCoordinatesProfilesNetCDF = (url, url_download) => {
        //Disable tabs before click to file
        dispatch(getStatusProductTab(true));
        dispatch(getStatusPlotTab(true));
        //here it need remove data from status data plots
        dispatch(setDataFile(null))
        dispatch(setTranferlistChoose([]))
        getCoordinatesProfilesFromURL(url, url_download)
            .then((response) => {
                console.log("a ver: ")
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

            <div className='row m-3'>
            
                <Tabs
                    // defaultActiveKey={tabStatus.key}
                    activeKey={selectTab.status}
                    id="controlled-tab-example"
                    onSelect={(k) => dispatch(getSelectTab(k))}
                    
                >
                    <Tab eventKey="source" title="Data Source Selection">
                        <div className="row m-3 bg-light border p-2 ">
                            <div className="col-sm-6 col-md-3 ">
                                <EstocCatalogs send={obtainCoords} baselayer={"fixedobs"}/>
                            </div>
                        
                            {/* Map */}
                            <div className="col-sm-6 col-sm-offset-4 col-md-9 col-md-offset-3">
                                <MapViewEstoc filesData={dataFile}/>
                            </div>
                        </div>
                    </Tab>



                    <Tab eventKey="product" title="Data Product Selection" disabled={statusProduct.status}>
                        
                    </Tab>
                    <Tab label="Tab Style" eventKey="plots" title="Plots" disabled={statusPlot.status}>
                        <FixedObsPlots url={statusPlot.url} url_download={statusPlot.url_download} is_profile={dataFile ? dataFile.site.isprofile: null}/>
                    </Tab>
                </Tabs>
            </div>

            
        </div>
    );
}

export default EstocView;
