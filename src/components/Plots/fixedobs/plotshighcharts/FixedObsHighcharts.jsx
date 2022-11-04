import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown.js';
import { useSelector, useDispatch } from 'react-redux';
// init the module
exporting(Highcharts);
drilldown(Highcharts);

const FixedObsHighcharts = ({data}) => {
  // const [dataState, setDataState] = useState(data);

  useEffect(() => {
    console.log("En el useEffect de highcharts");
    console.log(data);
  }, []);

  let options = {}

    options = {
      exporting:{
        enabled: true
    },
    accessibility: {
      enabled: false
    },
    title: {
      text: data.Standard_name
    },
    subtitle: {
      text: data.description
  },
    xAxis: {
      title: {
        text: data.name_data
    }
  },
    yAxis: [{ // Tertiary yAxis
        reversed:true,
          gridLineWidth: 0,
          title: {
              text: data.Standard_name_coord,
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
                headerFormat: `<b>${data.Standard_name_coord} - ${data.name_data}</b><br>`,
                pointFormat: `{point.y} ${data.dataset.units[1]}, {point.x} ${data.dataset.units[0]}`
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
          name: data.name_data,
          type: 'spline',
          colorAxis: null,
          // xAxis: 0,
          // color: '#071418',
          data: data.dataset.values,
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
    
    

    return (
        <div>
        <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
        </div>
    );
}

export default FixedObsHighcharts;
