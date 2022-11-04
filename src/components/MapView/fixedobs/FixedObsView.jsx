import React, {useState} from 'react';
import { getCoordinatesFromURL } from '../../../services/ThreddsService';
import EstocCatalogs from './FixedObsCatalogs';
import MapViewEstoc from './FixedObsMapView';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectTab, getStatusPlotTab, getStatusProductTab } from '../../../store/actions/tabActions';
import FixedObsPlots from '../../Plots/fixedobs/FixedObsPlots';
import { setDataFile, setTranferlistChoose } from '../../../store/actions/highchartActions';

const EstocView = () => {
    const [dataFile, setDataPopUp] = useState(null);
    // const [selectTab, setSelectTab] = useState("source");
    
    const state = useSelector(state=>state);
    const statusPlot = state.statusPlotTab;
    const statusProduct = state.statusProductTab;
    const selectTab = state.statusSelect;

    const dispatch = useDispatch();


    const divider_style = {
        borderRight: "1px dashed #333"
    }

    function obtainCoords(is_file, url) {
        (is_file) ?
            obtainCoordinatesNetCDF(url)
            : 
            console.log()
    }

    const obtainCoordinatesNetCDF = (name) => {
        //Disable tabs before click to file
        dispatch(getStatusProductTab(true));
        dispatch(getStatusPlotTab(true));
        //here it need remove data from status data plots
        dispatch(setDataFile(null))
        dispatch(setTranferlistChoose([]))
        getCoordinatesFromURL(name)
            .then((response) => {
                setDataPopUp(response.data);
            })
            .catch((error) => alert(`Error method post coordinates: ${error}`))
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
                                <EstocCatalogs send={obtainCoords}/>
                            </div>
                        
                            {/* Map */}
                            <div className="col-sm-6 col-sm-offset-4 col-md-9 col-md-offset-3">
                                <MapViewEstoc filesData={dataFile}/>
                            </div>
                        </div>
                    </Tab>



                    <Tab eventKey="product" title="Data Product Selection" disabled={statusProduct.status}>
                        <h1>Tab 2</h1>
                    </Tab>
                    <Tab label="Tab Style" eventKey="plots" title="Plots" disabled={statusPlot.status}>
                        <FixedObsPlots url={statusPlot.url}/>
                    </Tab>
                </Tabs>
            </div>

            
        </div>
    );
}

export default EstocView;
