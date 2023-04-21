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
import Footer from "../../../Footer/Footer";


export default function AppSidebar() {

  const [map, setMap] = useState(null)
  const state = useSelector(state=>state);
  const stateLoading = state.StateLoading;

  //Others variables
  const states = useSelector(state=>state);
  const selectTab = states.statusSelect;
  const dataFile = states.popUpData;
  const dataGlider = state.dataGliderVar;
  const dataGliderLoading = state.dataGliderVarLoading
  const dispatch = useDispatch();


  // const dataHigh = states.dataHigcharting;

  // console.log(dataHigh)


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
                              {map && <Sidebar dataGlider={[]} map={map}/>}
                              <Map setMap={setMap} fullData={dataFile}  myMap={map} gliderVariableData={dataGlider} gliderVariableLoading={dataGliderLoading}/>
                        </div>
                      </Tab>
                  </Tabs>
              </div>
        </div>
        <Footer/>
        </div>
      
    
  );

}
