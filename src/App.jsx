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
import Contact from './components/Contact/Contact';


const App = () => {
  return (
    <Router>
  
      <Routes>
        {/* HomePage Cards*/}
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/fixedobs' element={<AppSidebarTabs/>}/>
        <Route exact path='/gliders' element={<AppSidebarGliders/>}/> 
        <Route exact path='/dataportal'/>
        <Route exact path='/contact' element={<Contact/>}/> 
      </Routes>

    </Router>
  );
}

export default App;
