import React from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';
// init the module
exporting(Highcharts);

const FixedObsHighStock = ({data}) => {

    let data_time = []
    if("values" in data.dataset){
      data.dataset.values.map((value, index) => {
        data_time.push([new Date(value[0]).getTime(), value[1]])
      })
    }
    
    const options = {
      chart: {
        animation: false,
      },
        rangeSelector: {
          buttons: []
        },
        exporting:{
          enabled: true
      },
      accessibility: {
        enabled: false
      },
      legend: {
        enabled: true
    },
        title: {
          text: data.Standard_name
        },
        subtitle: {
          text: data.description
      },
        yAxis: [{ // Primary yAxis
          labels: {
              // format: '{value}°C',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          title: {
              text: data.name_data,
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          opposite: false
      }],
        series: [
          {
            name: `<b>${data.Standard_name_coord} ${data.value_coord} ${data.dataset.units[1]} </b>`,
            color: '#7cb5ef',
            data: data_time.sort(),
            lineWidth: 0,
            marker: {
              enabled: true,
              radius: 2
            },
            tooltip: {
              valueSuffix: " " + data.dataset.units[0],
              valueDecimals: 3
            },
            states: {
              hover: {
                  lineWidthPlus: 0
              }
            }
          }
        ]
      };
    return (
        <div>
            <HighchartsReact
              highcharts={Highcharts}
              constructorType={'stockChart'}
              options={options}
            />
        </div>
    );
}

export default FixedObsHighStock;
