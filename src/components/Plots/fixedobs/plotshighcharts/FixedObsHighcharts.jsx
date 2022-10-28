import React from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown.js';
import { useSelector, useDispatch } from 'react-redux';
// init the module
exporting(Highcharts);
drilldown(Highcharts);

const FixedObsHighcharts = () => {
  const state = useSelector(state=>state);
    const transferList_Data = state.transferListData;
    let options = {}
    if(transferList_Data != null){
      options = {
        exporting:{
          enabled: true
      },
      accessibility: {
        enabled: false
      },
      title: {
        text: transferList_Data[0].Standard_name
      },
      subtitle: {
        text: transferList_Data[0].description
    },
      xAxis: {
        title: {
          text: transferList_Data[0].name_data
      }
    },
      yAxis: [{ // Tertiary yAxis
          reversed:true,
            gridLineWidth: 0,
            title: {
                text: transferList_Data[0].Standard_name_coord,
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }
        }],
        plotOptions: {
          spline: {
              marker: {
                  radius: 5,
                  states: {
                      hover: {
                          enabled: true,
                          lineColor: 'rgb(100,100,100)'
                      }
                  }
              },
              tooltip: {
                  headerFormat: `<b>${transferList_Data[0].Standard_name_coord} - ${transferList_Data[0].name_data}</b><br>`,
                  pointFormat: `{point.y} ${transferList_Data[0].dataset.units[1]}, {point.x} ${transferList_Data[0].dataset.units[0]}`
              }
          }
      },
      colorAxis: {
        min: 1,
        max: 50,
        type: 'logarithmic',
        minColor: '#EEEEFF',
        maxColor: '#ff0000'
    },
        series: [
          {
            name: transferList_Data[0].name_data,
            type: 'spline',
            colorAxis: null,
            // xAxis: 0,
            // color: '#071418',
            data: transferList_Data[0].dataset.values,
          //   zoneAxis: 'x',
          //   zones: [{
          //         value: 200,  
          //         color: '#bdbdbd'  
          //     },{
          //         value:300,
          //         color: '#ff0000'  
          //     },
          //     {
          //         value:500,
          //         color: 'blue'  
          //     },{
          //         value:800,
          //         color: 'black'  
          // }]
          }
        ]
      };
    }

    return (
        <div>
        {
          transferList_Data != null ? 
          (<HighchartsReact
              highcharts={Highcharts}
              options={options}
            />)
          :
          null
        }
            
        </div>
    );
}

export default FixedObsHighcharts;
