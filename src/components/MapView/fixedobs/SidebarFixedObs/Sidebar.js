import React, { useState } from 'react'
import { FiHome, FiChevronLeft, FiCompass, FiSettings } from "react-icons/fi";
import { Sidebar, Tab } from '../../../../react-leaflet-sidetabs'
import FixedObsCatalogsThredds from '../FixedObsCatalogsThredds';
import { FaCaretLeft, FaBookOpen, FaChartBar, FaMap, FaInfo, FaCog } from "react-icons/fa";
import logo from '../../../../assets/images/logo_laplocan.png';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectTab, getStatusPlotTab, getStatusProductTab } from '../../../../store/actions/tabActions';
import { setDataFile, setTranferlistChoose } from '../../../../store/actions/highchartActions';
import { setStateLoading } from '../../../../store/actions/LoadingActions';
import { getCoordinatesFromURL, getCoordinatesProfilesFromURL } from '../../../../services/ThreddsService';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import {Marker, Popup } from "react-leaflet";
import TableInformation from '../../../Plots/fixedobs/table_info/TableInformation';
import FixedObsPlots from '../../../Plots/fixedobs/FixedObsPlots';
import ReactDOM from 'react-dom';
import $ from 'jquery'; 
import FixedObsPlotsSidebar from './plots/FixedObsPlotsSidebar';
import { getDataFilePopUp } from '../../../../store/actions/dataPoupActions';





const SidebarComponent = ({ map }) => {
    const state = useSelector(state=>state);
   const [filesData, setDataPopUp] = useState(null);
   const [openTab, setOpenTab] = useState('home')
   const [clickPlots, setClickPlots] = useState(false);
   const dispatch = useDispatch();
   const data_highcharts = state.dataHighchart;
   const transferList_Data = state.transferListData;
   const statusPlot = state.statusPlotTab;

   const onClose = () => {
      setOpenTab(false)
   }

   const onOpen = id => {
      setOpenTab(id)
   }


   function obtainCoords(is_file, url, url_download, is_profile) {
      if(is_file){
          setDataPopUp(null);
          setClickPlots(false);
          clearMap();
          if(is_profile){
              obtainCoordinatesProfilesNetCDF(url, url_download)
          }else{
              obtainCoordinatesNetCDF(url, url_download)
          }
      }
  }

  const clearMap = () =>{
    map.closePopup();
    map.eachLayer(layer=>{
        if (layer instanceof L.Marker) {
          map.removeLayer(layer)
        }
      })
  }

  const obtainCoordinatesProfilesNetCDF = (url, url_download) => {
   //Disable tabs before click to file
   dispatch(getStatusProductTab(true));
    dispatch(getStatusPlotTab(true));
   //here it need remove data from status data plots
   dispatch(setDataFile(null))
   dispatch(setTranferlistChoose([]))
   dispatch(setStateLoading(true))
   dispatch(getDataFilePopUp(null))
   getCoordinatesProfilesFromURL(url, url_download)
       .then((response) => {
           setDataPopUp(response.data);
           console.log(response.data)
          dispatch(setStateLoading(false))

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

const obtainCoordinatesNetCDF = (url, url_download) => {
        
   //Disable tabs before click to file
   dispatch(getStatusProductTab(true));
    dispatch(getStatusPlotTab(true));
   //here it need remove data from status data plots
   dispatch(setDataFile(null))
   dispatch(setTranferlistChoose([]))
   dispatch(setStateLoading(true))
   dispatch(getDataFilePopUp(null))
   getCoordinatesFromURL(url, url_download)
       .then((response) => {
           setDataPopUp(response.data);
         console.log(response.data)
         dispatch(setStateLoading(false))
      //      map.flyTo([response.data.site.Latitude, response.data.site.Longitude], 8,{
      //       duration:2
      //   });
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

function onClickPlot(){
    dispatch(getStatusPlotTab(false, filesData.site.url, filesData.site.url_download, filesData.isprofile));
    dispatch(getDataFilePopUp(filesData))
    dispatch(getSelectTab("plots"));
    console.log("clickplot")
};

const handleClick = async () =>{
    console.log("Handle")
}


function Markers() {
//    map.flyTo([filesData.site.Latitude, filesData.site.Longitude], 7,{
//        duration:0.5
//    });
   map.flyTo([filesData.site.Latitude, filesData.site.Longitude], 7);
    var marker = L.marker([filesData.site.Latitude, filesData.site.Longitude]).addTo(map);
    let itemList=[];
    filesData.properties_file.Properties.map((dataProperties, index) => {
        itemList.push(`<li key=${index}>${dataProperties}</li>`)
    })
   var customOptions =
    {
    'maxWidth': '400',
    'width': '400'
    }

   marker.bindPopup(`<div class='container'>
                          <div >
                              <h5>Description</h5>
                              <ul>
                                  <li>Name: ${filesData.site.Name}</li>
                                  <li>Description: ${filesData.site.Description}</li>
                                  <li>Area: ${filesData.site.Area}</li>
                                  <li>Latitude: ${filesData.site.Latitude}</li>
                                  <li>Longitude: ${filesData.site.Longitude}</li>
                                  <li>Date from: ${filesData.site.Datefrom}</li>
                                  <li>Date to: ${filesData.site.Dateto}</li>
                              </ul>
                          </div>
   
                          <div>
                              <h5>Properties</h5>
                              
                              <ul>
                                  ${itemList.join(" ")}
                              </ul>
                          </div>
                          <div class='d-flex justify-content-end'>
                            <button type="button" class="mx-2 btn btn-primary plotsBtn">Generate Plot</button>
                          </div>
   
                      </div>`, customOptions).
                      on("popupopen", () => {
                            $(".plotsBtn").on("click", e => {
                            e.preventDefault();
                            onClickPlot();
                          });
                      });

}

   return (
      <section className="Sidebar">
         <Sidebar
            map={map}
            position="left"
            collapsed={!openTab}
            selected={openTab}
            closeIcon={<FaCaretLeft />}
            onClose={onClose}
            onOpen={onOpen}
            panMapOnChange
            rehomeControls>

            <Tab id="home" header="Catalog" icon={<FaMap />} active>
               <div >
                     <FixedObsCatalogsThredds send={obtainCoords} />
                     {
                     filesData != null ?
                     <Markers/>
                     :
                     null
                  }
               </div>
            </Tab>
            {/* <Tab id="plots" header="Plots" icon={<FaChartBar />}>
               <div>
                  
               </div>
            </Tab> */}

            <Tab id="info" header="Information" icon={<FaInfo />}>
            <div id="disclaimer">
                    <br />
                    <strong>Disclaimer</strong>
                    <p>These data were collected and made freely available by PLOCAN through international and national projects that contribute to ESTOC observatory.</p>
                    <p><i>OceanSITES ESTOC in-situ data</i></p>
                </div>
                <hr />
                <div>
                    For further information about the <strong>Plocan data service</strong>, you can visit the website <a href="https://plocan.eu/servicios/servicio-de-datos" target="_blank">here</a>.
                </div>
                <br />
                <hr />
                <div>
                    <p className="logos-info"><a href="https://plocan.eu/servicios/servicio-de-datos" target="_blank"><img src={logo} width="200" height="50" alt="logo plocan" /></a></p>
                    </div>

            </Tab>

            <Tab id="settings" header="Settings" icon={<FaCog     />} anchor="bottom">
               <p>The button for this tab can be anchored to the bottom by using the <code>anchor="bottom"</code> props on the <code>Tab</code> component</p>
            </Tab>

         </Sidebar>
      </section>
   )

}

export default SidebarComponent