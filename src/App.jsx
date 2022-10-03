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
      </Routes>

    </Router>
    // <div><Home/></div>
    // <div className="container-fluid">

    //     <div className="row m-3">
    //       <div className="col-12">
    //         <h1 className="text-center">GeoApp</h1>
    //       </div>
    //     </div>

    //       <div className="row m-3">
    //           <div className="col-sm-4 col-md-2">
    //             <div className='form-group'>
    //               <SelectCatalogs send={obtainCoords}/>
    //             </div>
    //           </div>
              
    //           {/* Map */}
    //           <div className="col-sm-8 col-sm-offset-4 col-md-10 col-md-offset-3">
    //             <MapView coords={markers}/>
    //           </div>
    //       </div>

    //     <div className="row m-3">
    //       <div className="col">
    //         <table className="table table-striped">
    //           <thead>
    //             <tr>
    //               <th>ID</th>
    //               <th>Type</th>
    //               <th>Name</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             <tr>
    //               <td>1</td>
    //               <td>Type 1</td>
    //               <td>name 1</td>
    //             </tr>
    //             <tr>
    //               <td>2</td>
    //               <td>Type 2</td>
    //               <td>name 2</td>
    //             </tr>
    //             <tr>
    //               <td>3</td>
    //               <td>Type 1</td>
    //               <td>name 3</td>
    //             </tr>
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //     <div>
    //       {/* <Plots/> */}
    //     </div>
    //   </div>
  );
}

export default App;
