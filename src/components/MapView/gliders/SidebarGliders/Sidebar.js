import React, { useState } from 'react'
import { FiHome, FiChevronLeft, FiCompass, FiSettings } from "react-icons/fi";
import { Sidebar, Tab } from '../../../../react-leaflet-sidetabs'
import { FaCaretLeft, FaBookOpen, FaChartBar, FaMap, FaInfo, FaCog } from "react-icons/fa";
import logo from '../../../../assets/images/logo_laplocan.png';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectTab, getStatusPlotTab, getStatusProductTab } from '../../../../store/actions/tabActions';
import { setDataFile, setTranferlistChoose } from '../../../../store/actions/highchartActions';
import { setStateLoading } from '../../../../store/actions/LoadingActions';
import { getDataFilePopUp } from '../../../../store/actions/dataPoupActions';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import {Marker, Popup } from "react-leaflet";
import TableInformation from '../../../Plots/fixedobs/table_info/TableInformation';
import FixedObsPlots from '../../../Plots/fixedobs/FixedObsPlots';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import GlidersCatalogs from '../GlidersCatalogs';
import { Icon } from 'leaflet';
import end_circle from '../../../../assets/images/end_circle.svg';
import glider_start from '../../../../assets/images/SLOCUM_G2.svg';
import {getCoordinatesGlidersFromURL } from '../../../../services/ThreddsService';

const FinishRoute = new Icon({
    iconUrl: end_circle,
    iconSize: [40,40]
   })
  
   const GliderStarting = new Icon({
    iconUrl: glider_start,
    iconSize: [70,50]
   })
const SidebarComponent = ({ dataGlider, map }) => {
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


   function obtainCoords(is_file, url, url_download) {
      if(is_file){
          setDataPopUp(null);
          setClickPlots(false);
          clearMap();
          obtainCoordinatesNetCDF(url);
      }
  }

  const clearMap = () =>{
    map.closePopup();
    map.eachLayer(layer=>{
      console.log(layer)
        if (layer instanceof L.Marker) {
          map.removeLayer(layer)
        }
        if(layer instanceof L.Polyline){
          map.removeLayer(layer)
        }
      })
      console.log("-------------")
  }

const obtainCoordinatesNetCDF = (url, url_download) => {
        
   //Disable tabs before click to file
   //here it need remove data from status data plots
   dispatch(setDataFile(null))
   dispatch(setTranferlistChoose([]))
   dispatch(setStateLoading(true))
   dispatch(getDataFilePopUp(null))
   getCoordinatesGlidersFromURL(url, url_download)
       .then((response) => {
        setDataPopUp(response.data);
         console.log(response.data)
         dispatch(getDataFilePopUp(response.data))
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


function Markers({dataJSON}) {
    dataJSON.USV_DATA[0].coordinates.map((values, index) => {
        var position = []
        var date_init;
        var date_fin;
        for (const [key, value] of Object.entries(values)) {
          date_init = values[key].date_init
          date_fin = values[key].date_fin

          // values[key].latitude.map((coordinate, idx) => {
          //   coordinates_glider.push([coordinate, values[key].longitude[idx]])
          // })

          if (dataGlider.length > 0){
            position.push(dataGlider[0])
            dataGlider = []
          }
          // values[key].latitude.map((coord, idx) => {
          //   coordinates.push([coord, filtered_longitude[idx]])
          // })

          const filtered_latitude= values[key].latitude.filter((coord) => (coord <90))
          const filtered_longitude = values[key].longitude.filter((coord) => (coord <90))

          filtered_latitude.map((coord, idx) => {
            position.push([coord, filtered_longitude[idx]])
            
          })
          //[filtered_latitude[filtered_latitude.length-1], filtered_longitude[filtered_longitude.length-1]]
            dataGlider.push([filtered_latitude[filtered_latitude.length-1], filtered_longitude[filtered_longitude.length-1]])
        }
        // console.log(position[0])
        // coordinates_glider.push.apply(coordinates_glider, position)
        // console.log(coordinates_glider.length)
        var polyline = L.polyline([position], {color: 'red', weight: 6}).addTo(map);
        // var polyline1 = L.polyline(position, {color: 'red'})
        polyline.on('mouseover',(e)=>{
          e.target.openPopup()
          var layer = e.target;
          layer.setStyle({
              color: 'blue',
              opacity: 1,
              weight: 7
          });
        })

        polyline.on('mouseout',(e)=>{
          e.target.closePopup()
          var layer = e.target;
          layer.setStyle({
              color: 'red',
              opacity: 1,
              weight: 7
          });
        })
        
        polyline.bindPopup(`<b>From:</b> ${date_init} <br><b>To: </b>${date_fin}`);
        
          
      })
      // console.log(coordinates_glider.length)
      var popup = L.popup().setContent(`<b>Name:</b> ${dataJSON.USV_DATA[3].name} <br>
                                        <b>Date start: </b>${dataJSON.USV_DATA[3].date_start} <br>
                                        <b>Date end: </b>${dataJSON.USV_DATA[3].date_end}<br><br>
                                        <a class="btn btn-outline-primary btn-sm d-flex justify-content-center" href='${dataJSON.USV_DATA[3].url_download}' role="button">Download NetCDF</a>`);
      L.marker(dataJSON.USV_DATA[2].first_coordinate, {icon: GliderStarting}).bindPopup(popup).addTo(map);
      L.marker(dataJSON.USV_DATA[2].last_coordinate, {icon: FinishRoute}).addTo(map);
      map.flyTo(dataJSON.USV_DATA[2].first_coordinate, 8,{
        duration:0.5
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
                     <GlidersCatalogs send={obtainCoords} />
                     {
                     filesData != null ?
                     <Markers dataJSON={filesData}/>
                     :
                     null
                  }
               </div>
            </Tab>
            <Tab id="plots" header="Plots" icon={<FaChartBar />}>
               <div>
                  
               </div>
            </Tab>

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