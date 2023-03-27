import React, { useState, useEffect } from 'react'
import { FiHome, FiChevronLeft, FiCompass, FiSettings } from "react-icons/fi";
import { Sidebar, Tab } from '../../../../react-leaflet-sidetabs'
import { FaCaretLeft, FaBookOpen, FaChartBar, FaMap, FaInfo, FaCog } from "react-icons/fa";
import logo from '../../../../assets/images/logo_laplocan.png';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectTab, getStatusPlotTab, getStatusProductTab } from '../../../../store/actions/tabActions';
import { setDataFile, setTranferlistChoose } from '../../../../store/actions/highchartActions';
import { setStateLoading } from '../../../../store/actions/LoadingActions';
import { getCoordinatesGlidersFromURL, getDatasetGliderFromVariableName} from '../../../../services/ThreddsService';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import {Marker, Popup } from "react-leaflet";
import TableInformation from '../../../Plots/fixedobs/table_info/TableInformation';
import FixedObsPlots from '../../../Plots/fixedobs/FixedObsPlots';
import ReactDOM from 'react-dom';
import $ from 'jquery'; 
import GlidersCatalogs from '../GlidersCatalogs';
import end_circle from '../../../../assets/images/end_circle.svg';
import glider_start from '../../../../assets/images/SLOCUM_G2.svg';
import { Icon } from 'leaflet';
import CloseIcon from '@mui/icons-material/Close';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import CircularProgress from '@mui/material/CircularProgress';
import Highcharts, { correctFloat } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';


const FinishRoute = new Icon({
    iconUrl: end_circle,
    iconSize: [40,40]
   })
  
   const GliderStarting = new Icon({
    iconUrl: glider_start,
    iconSize: [70,50]
   })

    var collapsedFlag = (window.innerHeight < 800) || (window.innerWidth < 767) ? true : false
    var layerControl = L.control.layers(undefined, undefined, {
	    collapsed: collapsedFlag
    });

    var highchart = L.control({	
        collapsed: collapsedFlag,
        position: 'bottomright'
    });

    var pathLayer;
const SidebarComponent = ({ map }) => {
    const state = useSelector(state=>state);
   const [filesData, setDataPopUp] = useState(null);
   const [openTab, setOpenTab] = useState('home')
   const dispatch = useDispatch();
   const data_highcharts = state.dataHighchart;
   const transferList_Data = state.transferListData;
   const statusPlot = state.statusPlotTab;
   
    //Gliders states
    let dataGlider = []
    const [dataHighchart, setDataHighchart] = useState(null);
    const [fullDataset, setFullData] = useState(null);
    const [stateLoadingHighchart, setstateLoadingHighchart] = useState(false);
    const [stateHideShowChart, setstateHideShowChart] = useState(true);

    const [stateClassNameHighCharte, setstateClassNameHighCharte] = useState("close border-0");
    const [stateHighchartClassName, setHighchartClassName] = useState('highchart-block');
    const [clickPlots, setClickPlots] = useState(false);
    useEffect(() => {
        setDataHighchart(null)
      }, [fullDataset]);

   const onClose = () => {
      setOpenTab(false)
   }

   const onOpen = id => {
      setOpenTab(id)
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

function obtainCoords(is_file, url, url_download) {
    console.log(url)
    if(is_file){
        clearMap()
        setFullData(null);
        setClickPlots(false);
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

    const obtainCoordinatesNetCDF = (url) => {
        //Disable tabs before click to file
        //here it need remove data from status data plots
        dispatch(setStateLoading(true))
        // dispatch(setDataRoute(null))
        getCoordinatesGlidersFromURL(url)
            .then((response) => {
                console.log(response.data);
                setFullData(response.data);
                setClickPlots(true)
                dispatch(setStateLoading(false))
                
                // dispatch(setDataRoute(response.data))
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

const getDatasetFromVariable = (url, name_variable) => {
    // dispatch(setStateLoading(true))
    // setstateLoadingHighchart(true)
    getDatasetGliderFromVariableName(url, name_variable)
    .then((response) => {
        if(response.status === 200){
            console.log("Datita: ", response.data)
            setDataHighchart(response.data)
            // setstateLoadingHighchart(false)
        }
    })
    .catch((error) => {
    })
    
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


function CreatePolylinesUniques({dataJSON}){
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

  function CreateBaseLayer(){
      fullDataset.USV_DATA[1].data.names.map((value, index) => {
        pathLayer = L.featureGroup([])
        .on('add', function(e) {
            console.log("add");
            setDataHighchart(null);
            setClickPlots(false)
            // legendWhenPathLayerAdd(highchart);
            // showDivHigh();
            getDatasetFromVariable(value.url,value.variable_name);
            // showHighChart();
        })
        .on('remove', function() {
            console.log("remove")
        });
        layerControl.addBaseLayer(pathLayer, value.standard_name);

    })

    layerControl.addTo(map);
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
               <div className='mt-3'>
                     <GlidersCatalogs send={obtainCoords}/>
                      {
                        fullDataset != null ?
                        <CreatePolylinesUniques dataJSON={fullDataset}/>
                        :
                        null
                      }

                      {
                        clickPlots ?
                          <CreateBaseLayer/>
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