import React, { useState } from "react";
import Map from './SideBarMap'
import Sidebar from './Sidebar'
import "./styles.scss";
import NavigationMenu from '../../../Home/Navigation/NavigationMenu';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getSelectTab } from "../../../../store/actions/tabActions";
import { Navigation } from "@mui/icons-material";
import FixedObsPlots from "../../../Plots/fixedobs/FixedObsPlots";


export default function AppSidebar() {

  const [map, setMap] = useState(null)
  const state = useSelector(state=>state);
  const stateLoading = state.StateLoading;

  //Others variables
  const states = useSelector(state=>state);
  const statusPlot = states.statusPlotTab;
  const statusProduct = states.statusProductTab;
  const selectTab = states.statusSelect;
  const dataFile = states.popUpData;
  const dispatch = useDispatch();

  return (

    <div>
        <NavigationMenu/>
            <div className="container-fluid">

            <div className='row mt-5'>
            
                <Tabs
                    // defaultActiveKey={tabStatus.key}
                    activeKey={selectTab.status}
                    id="controlled-tab-example"
                    onSelect={(k) => dispatch(getSelectTab(k))}
                    style={{'marginBottom': '10px'}}
                    
                >
                    <Tab eventKey="source" title="Data Source Selection">
                      <div className="Appsidebar">
                        {
                          stateLoading ?
                            (<div className='d-flex align-items-center justify-content-center align-self-center'
                            style={{minHeight: "100vh", zIndex: 1000, position: "absolute", width:"100%"}}>
                                <CircularProgress style={{'color': 'white'}}/>
                            </div>)
                          :
                            null
                        }
                            {map && <Sidebar map={map}/>}
                            <Map setMap={setMap}/>
                      </div>
                    </Tab>
                    {/* <Tab eventKey="product" title="Data Product Selection" disabled={statusProduct.status}>
                        
                    </Tab> */}
                    <Tab label="Tab Style" eventKey="plots" title="Plots" disabled={statusPlot.status}>
                        <FixedObsPlots url={statusPlot.url} url_download={statusPlot.url_download} is_profile={dataFile ? dataFile.site.isprofile: null}/>
                    </Tab>
                </Tabs>
            </div>
            
        </div>
        </div>
      
    
  );

}
