import React, { useMemo, useState, useEffect } from 'react'
import { MapContainer, TileLayer, ScaleControl, LayersControl, FeatureGroup, Marker, ZoomControl } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux';
import { getDatasetGliderFromVariableName } from '../../../../services/ThreddsService';
import { setStateLoading } from '../../../../store/actions/LoadingActions';
import L from 'leaflet';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import Highcharts, { correctFloat } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { setDataHighcharts } from '../../../../store/actions/dataHighcharts';
import '../css/GliderMapSidebar.css'

var layerControl = L.control.layers(undefined, undefined, {
  collapsed: false
});

const Map = props => {
   const { BaseLayer, Overlay } = LayersControl;
   const state = useSelector(state=>state);
   const stateLoading = state.StateLoading;
  //  const [dataHighchart, setDataHighchart] = useState(null);
   const [stateHideShowChart, setstateHideShowChart] = useState(true);
   const [stateLoadingHighchart, setstateLoadingHighchart] = useState(false);
   const dispatch = useDispatch();
   const [stateClassNameHighCharte, setstateClassNameHighCharte] = useState("close border-0");
   const [stateHighchartClassName, setHighchartClassName] = useState('highchart-block');

   const [dataHighchart, setDataHighchart] = useState(null);
   

   
   useEffect(() => {
    setDataHighchart(null)
  }, [props.fullData]);
  
  const getDatasetFromVariable = (url, name_variable) => {
    // dispatch(setStateLoading(true))
    setstateLoadingHighchart(true)
    getDatasetGliderFromVariableName(url, name_variable)
    .then((response) => {
        if(response.status === 200){
            console.log(response.data)
            setDataHighchart(response.data)
            setstateLoadingHighchart(false)
            // dispatch(setDataHighcharts(response.data))
        }
    })
    .catch((error) => {
      console.log("Error to load dataset", error)
      setstateLoadingHighchart(false)
    })
    
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
                    menuItems: [
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
                        var miMarker = L.marker(latlng).addTo(props.myMap)
                        markers.push(miMarker);
                      }
                    },
                    mouseOut: function () {
                      while (markers.length){
                        markers.pop().removeFrom(props.myMap);
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
                  <ZoomControl position='topright'/>
            <ScaleControl />

            { props.fullData != null ?
                  <>
                  <LayersControl collapsed={false}>
                  {
                    props.fullData.USV_DATA[1].data.names.map((value, idx) => {
                      return <BaseLayer key={idx} name={value.standard_name}>
                      <Marker
                        position={[28.0000000, -15.5000000]}
                        opacity={0}
                        eventHandlers={{
                        add: (e) => {
                          // dispatch(setDataHighcharts(null))
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
                  null
                }
                {dataHighchart != null ?
                  <div className='leaflet-bottom leaflet-right mx-4'>
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
      )
   }, [props, stateHideShowChart, stateClassNameHighCharte, stateHighchartClassName, stateLoadingHighchart, dataHighchart])

   return  map

}

export default Map