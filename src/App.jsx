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
        <Route exact path='/estoc' element={<EstocView/>}/>
        <Route exact path='/gliders' element={<GlidersView/>}/> 
        <Route exact path='/dataportal'/>
        <Route exact path='/test' element={<AppSidebar/>}/> 
      </Routes>

    </Router>
  );
}

export default App;
