import React, {useState, useEffect, useRef} from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, WMSTileLayer, LayersControl, useMap, Marker, Popup, Polyline} from "react-leaflet";
import { Icon } from 'leaflet';
import marker from '../../../assets/images/seaexp_jAByXKG_.svg';
import end_circle from '../../../assets/images/end_circle.svg';
import glider_start from '../../../assets/images/SLOCUM_G2.svg';
import L from 'leaflet';
import { useDispatch, useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import './css/GlidersMapView.css'
import { getDatasetGliderFromVariableName } from '../../../services/ThreddsService';
import { setStateLoading } from '../../../store/actions/LoadingActions';
import Highcharts, { correctFloat } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import CloseIcon from '@mui/icons-material/Close';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import icon from 'leaflet/dist/images/marker-icon.png';


var collapsedFlag = (window.innerHeight < 800) || (window.innerWidth < 767) ? true : false;
var layerControl = L.control.layers(undefined, undefined, {
  collapsed: false
});
var pathLayer = L.featureGroup([]);
// console.log(layerControl)
const GliderStart = new Icon({
  iconUrl: marker,
  iconSize: [60,60]
 })

 const FinishRoute = new Icon({
  iconUrl: end_circle,
  iconSize: [40,40]
 })

 const GliderStarting = new Icon({
  iconUrl: glider_start,
  iconSize: [70,50]
 })
//  const customMarker = new L.icon({
//   iconUrl: icon,
//   iconSize: [35, 46],
//   iconAnchor: [17, 46]
// });
//  var coordinates_glider = [];

const GlidersMapView = ({dataGlider, fullData}) => {

    const state = useSelector(state=>state);
    const [map, setMap] = useState(null);
    const dispatch = useDispatch();
    const stateLoading = state.StateLoading;
    const [dataHighchart, setDataHighchart] = useState(null);
    const [stateLoadingHighchart, setstateLoadingHighchart] = useState(false);
    const [stateClassNameHighCharte, setstateClassNameHighCharte] = useState("close border-0");
    const [stateHighchartClassName, setHighchartClassName] = useState('highchart-block');
    const [stateHideShowChart, setstateHideShowChart] = useState(true);
    
    //clean graphic showed from map
    useEffect(() => {
      setDataHighchart(null)
    }, [fullData]);

    function CreatePolylinesUniques({dataJSON}){
      const map = useMap();
      // coordinates_glider = []
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

    function SetCircularProgress(){
      const map = useMap();
      map.eachLayer(layer=>{
        if (layer instanceof L.Polyline) {
          map.removeLayer(layer)
          layerControl.remove(map)
          // layerControl.removeLayer(pathLayer);
        }
        if (layer instanceof L.Marker) {
          map.removeLayer(layer)
        }
      })
        return (<CircularProgress style={{'color': 'white'}}/>);
    }

    const searchIndex = (v, x) => {
      var i=0;
      while (v[i] < x){i++;}
      
      if (i >= v.length){
        return v.length -1;
      }
      else{
        return i;
      }
    }

    function ShowHighStock(){
      var markers = []
      let date_time = []
      let data_time = []
      if("values" in dataHighchart.variable_info.dataset){
        dataHighchart.variable_info.dataset.values.map((value, index) => {
          data_time.push([new Date(value[0]).getTime(), value[1]])
          date_time.push(new Date(value[0]).getTime())
        })
      }

      var color_vector = [
        {color: "rgb(36,104, 180)"}, {color: "rgb(60,157, 194)"}, {color: "rgb(128,205,193)"}, {color: "rgb(151,218,168 )"}, {color: "rgb(198,231,181)"}, 
        {color: "rgb(238,247,217)"}, {color: "rgb(255,238,159)"}, {color: "rgb(252,217,125)"}, {color: "rgb(255,182,100)"},  {color: "rgb(252,150,75)"}, 
        {color: "rgb(250,112,52)"},  {color: "rgb(245,64,32)"},   {color: "rgb(237,45,28)"},   {color: "rgb(220,24,32)"},    {color: "rgb(180,0,35)"}
        ];
      
        var stops = [];
        for (var i=0; i < color_vector.length; i++){
              let perc = i/(color_vector.length - 1);
              stops.push([perc, color_vector[color_vector.length - 1 - i].color]);
        }


       

      // var last_coordinates = [];
        var buttons = [{
            type: 'hour',
            count: 1,
            text: 'Hour'
          }, {
            type: 'hour',
            count: 12,
            text: '12 hours'
          }, {
            type: 'day',
            count: 1,
            text: 'Day'
          }, {
            type: 'all',
            text: 'All'
          }];

          // var buttons_export = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;

          // buttons_export.push({
          //     text: "downloadNETCDF",
          //     onclick: function () {
          //       alert('OK');
          //   }
          // });

          const options = {
            chart: {
                animation: false,
                type: 'line'
            },
            rangeSelector: {
                allButtonsEnabled: true,
                buttons: buttons,
                buttonTheme: {
                  width: 49
                },
                selected: 5
              },
              exporting: {
                buttons: {
                    contextButton: {
                      menuItems: ["printChart",
                      "separator",
                      "downloadPNG",
                      "downloadJPEG",
                      "downloadPDF",
                      "downloadSVG",
                      "separator",
                      "downloadCSV",
                      "downloadXLS",
                      //"viewData",
                      "openInCloud"]
                    }
                }
            },
              accessibility: {
                enabled: false
              },
              legend: {
                enabled: true
            },
            title: {
                text: dataHighchart.variable_info.dataset.axis[1]
              },
              yAxis: [{ // Primary yAxis
                labels: {
                    // format: '{value}°C',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: dataHighchart.variable_info.dataset.axis[1],
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: false
            }],
    
            series: [{
              point: {
                  events: {
                      mouseOver: function () {
                        var i = searchIndex(date_time, this.x);
                        if (i < dataHighchart.variable_info.dataset.coordinates.length){
                          var latlng = L.latLng(dataHighchart.variable_info.dataset.coordinates[i]);
                          var miMarker = L.marker(latlng).addTo(map)
                          markers.push(miMarker);
                        }
                      },
                      mouseOut: function () {
                        while (markers.length){
                          markers.pop().removeFrom(map);
                        }
                      }
                  }
                },
                type: 'spline',
                name: `<b>${dataHighchart.variable_info.dataset.short_names[1]} </b>`,
                // color: '#7cb5ef',
                data: data_time.sort(),
                marker: {enabled: false, radius : 3},
                stickyTracking: true,
                gapSize: 2000000,
                gapUnit: 'value',
                tooltip: {
                  valueSuffix: " " + dataHighchart.variable_info.dataset.units,
                  valueDecimals: 3
                },
              }],
              plotOptions: {
                series: {
                    marker: {
                        fillColor: '#000000',
                        lineWidth: 2,
                        color: '#000000',
                        linecolor: '#000000'
                    },
                    color: {
                      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                      stops: stops
                    }
                }
            },
        }
      return <HighchartsReact
              highcharts={Highcharts}
              constructorType={'stockChart'}
              options={options}
              />
    }

    const hideHighchart = () => {
      setstateClassNameHighCharte('hide border-0')
      setHighchartClassName('highchart-none')
      setstateHideShowChart(false)

    }

    const showHighchart = () => {
      // setstateLoadingHighchart(null);
      setstateClassNameHighCharte('close border-0')
      setHighchartClassName('highchart-block')
      setstateHideShowChart(true)
    }

    const getDatasetFromVariable = (url, name_variable) => {
      dispatch(setStateLoading(true))
      setstateLoadingHighchart(true)
      getDatasetGliderFromVariableName(url, name_variable)
      .then((response) => {
          if(response.status === 200){
              console.log(response.data)
              setDataHighchart(response.data)
              setstateLoadingHighchart(false)
          }
      })
      .catch((error) => {
      })
      
  }

    const { BaseLayer, Overlay } = LayersControl;
    return (
        <MapContainer 
            style={{ height: "100vh"}}
            center={[28.275358, -18.303223]}
            zoom={8}
            ref={setMap}>
                {/* <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  /> */}
                <LayersControl position="topright" collapsed={true}>
                    <BaseLayer checked name="ArcGIS">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </BaseLayer>

                    <BaseLayer name="OpenStreetMap">
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </BaseLayer>
                </LayersControl>
                { fullData != null ?
                  <>
                  <CreatePolylinesUniques dataJSON={fullData}/>
                  <LayersControl collapsed={false}>
                  {
                    fullData.USV_DATA[1].data.names.map((value, idx) => {
                      return <BaseLayer key={idx} name={value.standard_name}>
                      <Marker
                        position={[28.0000000, -15.5000000]}
                        opacity={0}
                        eventHandlers={{
                        add: (e) => {
                          setDataHighchart(null)
                          setstateHideShowChart(true)
                          getDatasetFromVariable(value.url,value.variable_name);
                          
                        },
                        remove: (e) => {
                          console.log("Removed layer:", e.target);
                        }
                        }}
                      ></Marker>
                      </BaseLayer>
                    })
                    
                  }
                  </LayersControl>
                  </>
                  :
                  stateLoading ?
                    <div className='d-flex align-items-center justify-content-center align-self-center' style={{minHeight: "100vh", zIndex: 400, position: "relative"}}>
                        <SetCircularProgress/>
                    </div>
                    :
                    null
                } 
                {dataHighchart != null ?
                  <div className='leaflet-bottom leaflet-left'>
                    <div  className='container-high leaflet-control' >
                    {stateHideShowChart ?
                      (<button
                        className={stateClassNameHighCharte}
                        onClick={() => hideHighchart()}>
                        <CloseIcon/>
                      </button>
                      )
                      :
                      <button
                        className={stateClassNameHighCharte}
                        onClick={() => showHighchart()}>
                        <SignalCellularAltIcon/>
                      </button>
                    }
                      
                    <div className={stateHighchartClassName}> 
                        <ShowHighStock/>
                      </div>
                    </div>
                  </div>
                  :
                  stateLoadingHighchart ?
                    <div className='d-flex align-items-center justify-content-center align-self-center' style={{minHeight: "100vh", zIndex: 400, position: "relative"}}>
                      <CircularProgress style={{'color': 'white'}}/>
                    </div>
                  :
                    null
                }
                
        </MapContainer>
    );
}

export default GlidersMapView;
