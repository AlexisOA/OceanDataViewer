import React, { useMemo, useEffect } from 'react'
import { MapContainer, TileLayer, ScaleControl, LayersControl, FeatureGroup, Marker, ZoomControl } from 'react-leaflet'
const Map = props => {
   
   const map = useMemo( () => {
      return  (
         <MapContainer 
            doubleClickZoom={false}
            id="mapId"
            zoom={7}
            center={{lat: 28.275358, lng: -18.303223}}
            ref={props.setMap}>
   
                  <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  />
                  <ZoomControl position='bottomright'/>
            <ScaleControl />

            {/* <LayersControl>
               <LayersControl.Overlay name="Marker Overlay">
                  <FeatureGroup>
                     <Marker position={{lat: 28.275358, lng: -18.303223}} />
                  </FeatureGroup>
               </LayersControl.Overlay>
            </LayersControl> */}
         </MapContainer>
      )
   }, [props])

   return  map

}

export default Map