import React, {useState, useContext} from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, WMSTileLayer, LayersControl, useMap, Marker, Popup } from "react-leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import Plots from '../Plots/Plots';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function MyMarkers({data}) {
    console.log(data.coords[0])
    const map = useMap();
    var marker = L.marker(data.coords[0], {}).addTo(map)
    map.flyTo(data.coords[0], 9);
    marker.on('click', function(e) {
        
        marker.bindPopup(<Plots/>).openPopup();
    });
}

function Markers({ data }) {
    const map = useMap();
    console.log(data)
    return (
        Object.entries(data).length > 0 &&
      data.coords.map((marker, index) => {
        return (
          <Marker
            
            eventHandlers={{
              click: () => {
                
                map.setView(
                  [
                    marker[0],
                    marker[1]
                  ],
                  14
                );
              }
            }}
            key={index}
            position={{
              lat: marker[0],
              lng: marker[1]
            }}
            icon={DefaultIcon}
          >
            <Popup>
              <span>{"Data"}</span>
            </Popup>
          </Marker>
        );
      })
    );
  }

  
const MapView = ({coords}) => {
    const styleMap = { "width": "100%", "height": "60vh" };
    const { BaseLayer, Overlay } = LayersControl;

    const [map, setMap] = useState(null);
    return (
        <MapContainer style={styleMap}
            center={[28.0000000, -15.5000000]}
            zoom={8}
            whenCreated={setMap}>
              <LayersControl position="topright">
                <BaseLayer checked name="OpenStreetMap">
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
            coords != null ?
            (
                <Marker position={coords.coords[0]}
                // eventHandlers={{
                //     click: () => {
                //       // <Plots fileName={coords.id}/>
                //       console.log("clickaso")
                //     },
                // }}

            >   
                <Popup maxWidth={600} maxHeight={600}>
                      <Plots fileName={coords.id}/>
                </Popup>
            </Marker>
            )
            :
            null
        }
        </MapContainer>
    );
}

export default MapView;
