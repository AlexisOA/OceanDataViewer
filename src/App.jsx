import React, {useState} from 'react';
import './App.css';
import Home from './components/Home/Home';
import MapView from './components/MapView/MapView';
import Plots from './components/Plots/Plots';
import SelectCatalogs from './components/SelectCatalogs/SelectCatalogs';
import { getCoordinatesFromLocalFile } from './services/ThreddsService';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import EstocView from './components/MapView/fixedobs/FixedObsView';
import GlidersView from './components/MapView/gliders/GlidersView';
import AppSidebar from './components/MapView/fixedobs/TestingSidebar/SidebarView';
import AppSidebarGliders from './components/MapView/gliders/SidebarGliders/SidebarView';
import AppSidebarTabs from './components/MapView/fixedobs/SidebarFixedObs/SidebarView';


const App = () => {
  const [markers, setMarkers] = useState(null);

  function obtainCoords(is_file, id) {
    (is_file) ?
        obtainCoordinatesNetCDF(id)
        : 
        console.log()
  }

  const obtainCoordinatesNetCDF = (name) => {
    getCoordinatesFromLocalFile(name)
        .then((response) => {
            setMarkers(response.data);
        })
        .catch((error) => alert(`Error method post coordinates: ${error}`))
  }
  return (
    <Router>
  
      <Routes>
        {/* HomePage Cards*/}
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/fixedobs' element={<AppSidebarTabs/>}/>
        <Route exact path='/gliders' element={<AppSidebarGliders/>}/> 
        <Route exact path='/dataportal'/>
      </Routes>

    </Router>
  );
}

export default App;
