import React, {useRef, useEffect, useState} from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, WMSTileLayer, LayersControl, useMap, Marker, Popup } from "react-leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux'
import { getSelectTab, getStatusPlotTab, getStatusProductTab, getStatusTab } from '../../../store/actions/tabActions';
import CircularProgress from '@mui/material/CircularProgress';
import { setStateLoading } from '../../../store/actions/LoadingActions';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 36],
    iconAnchor: [15, 33]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapViewEstoc = ({filesData, loadingMap}) => {
    const state = useSelector(state=>state);
    const styleMap = { "width": "100%", "height": "100vh" };
    const { BaseLayer, Overlay } = LayersControl;
    const dispatch = useDispatch();
    const [map, setMap] = useState(null);

    const sizewindow = state.getSizeWindowMap;
    const stateLoading = state.StateLoading;
    
    // useEffect(() => {
    //     if(sizewindow.width != null){
    //      console.log("estamos redimensionando el mapa")
    //        setInterval(function () {
    //             map.invalidateSize();
    //             }, 100);

    //     }
    // }, [sizewindow]);

    const onClickProducto = (name) => {
        // dispatch(getStatusProductTab(false, filesData.site.url));
        // dispatch(getSelectTab(name));
    };

    const onClickPlot = (name) => {
        dispatch(getStatusPlotTab(false, filesData.site.url, filesData.site.url_download, filesData.isprofile));
        dispatch(getSelectTab(name));
    };

    function Markers() {
        const map = useMap();
        // map.eachLayer(layer=>{  
        //   if (layer instanceof L.Polyline) {
        //    map.removeLayer(layer.remove)
        //   }
        // })
  
        
        map.closePopup();
        map.flyTo([filesData.site.Latitude, filesData.site.Longitude], 10,{
            duration:2
        });
        return (
              <Marker 
                position={[filesData.site.Latitude, filesData.site.Longitude]}
                icon={DefaultIcon}
                // center={marker.coords}
                // radius={10}
                // pathOptions={redOptions}
              >
                <Popup maxWidth={600} maxHeight={600}>
                        <div className='container'>
                            
                            <div >
                                <h5>Description</h5>
                                <ul >
                                    <li>Name: {filesData.site.Name}</li>
                                    <li>Description: {filesData.site.Description}</li>
                                    <li>Area: {filesData.site.Area}</li>
                                    <li>Latitude: {filesData.site.Latitude}</li>
                                    <li>Longitude: {filesData.site.Longitude}</li>
                                    <li>Date from: {filesData.site.Datefrom}</li>
                                    <li>Date to: {filesData.site.Dateto}</li>
                                </ul>
                                

                            </div>

                            <div>
                                <h5>Properties</h5>
                                <ul>
                                    {
                                        filesData.properties_file.Properties.length > 0  ?
                                        (
                                            filesData.properties_file.Properties.map((dataProperties, index) => {
                                                return <li key={index}>{dataProperties}</li>
                                            })
                                        )
                                        :
                                        null
                                    }
                                </ul>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <Button className='mx-2' variant="primary" onClick={()=> onClickPlot("plots")}>Generate Plots</Button>
                            </div>

                        </div>
                        
                    </Popup>
              </Marker>
        );
    
    }

    // const settingMap = ( map: LeafletMap ) => {
    //     const resizeObserver = new ResizeObserver( () => {
    //             map.invalidateSize()
    //     } 
    //     const container = document.getElementById('map-container')
    //     resizeObserver.observe(container!)
    //     }

    return (
        <MapContainer 
            style={{ height: "100vh"}}
            center={[28.0000000, -15.5000000]}
            zoom={8}
            ref={setMap}>
              <LayersControl position="topright">
                <BaseLayer checked name="OpenStreetMap">
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                </BaseLayer>

                <BaseLayer name="ArcGIS">
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                </BaseLayer>
          </LayersControl>

          {
            filesData != null ?
            (
                
                <Marker position={[filesData.site.Latitude, filesData.site.Longitude]}
                >   
                    <Popup maxWidth={600} maxHeight={600} closeButton={false}>
                        {/* <Plots fileName={coords.id}/> */}
                        <div className='container'>
                            
                            <div >
                                <h5>Description</h5>
                                <ul >
                                    <li>Name: {filesData.site.Name}</li>
                                    <li>Description: {filesData.site.Description}</li>
                                    <li>Area: {filesData.site.Area}</li>
                                    <li>Latitude: {filesData.site.Latitude}</li>
                                    <li>Longitude: {filesData.site.Longitude}</li>
                                    <li>Date from: {filesData.site.Datefrom}</li>
                                    <li>Date to: {filesData.site.Dateto}</li>
                                </ul>
                                

                            </div>

                            <div>
                                <h5>Properties</h5>
                                <ul>
                                    {
                                        filesData.properties_file.Properties.length > 0  ?
                                        (
                                            filesData.properties_file.Properties.map((dataProperties, index) => {
                                                return <li key={index}>{dataProperties}</li>
                                            })
                                        )
                                        :
                                        null
                                    }
                                </ul>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <Button variant="primary" onClick={()=> onClickProducto("product") }>Select Product</Button>
                                <Button className='mx-2' variant="primary" onClick={() => onClickPlot("plots")}>Generate Plots</Button>
                            </div>

                        </div>
                        
                    </Popup>
            </Marker>
                
                
            )
            :
            stateLoading ?
                <div className='d-flex align-items-center justify-content-center align-self-center' style={{minHeight: "100vh", zIndex: 400, position: "relative"}}>
                    <CircularProgress
                    />
                </div>
            :
            null
        }
        </MapContainer>
    );
}

export default MapViewEstoc;
