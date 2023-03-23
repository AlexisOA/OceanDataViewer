import React, { useState } from "react";
import Map from './SideBarMap'
import Sidebar from './Sidebar'
import "./styles.scss";
import NavigationMenu from '../../../Home/Navigation/NavigationMenu';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

export default function AppSidebarGliders() {

  const [map, setMap] = useState(null)
  const state = useSelector(state=>state);
  const stateLoading = state.StateLoading;
  return (
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
    
  );

}
