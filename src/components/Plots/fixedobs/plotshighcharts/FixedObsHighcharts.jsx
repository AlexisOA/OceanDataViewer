import React from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts/highstock';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';

// init the module
exporting(Highcharts);

const FixedObsHighcharts = () => {
    const data = [
        {
            "coordinates" :{
                "Lat": [29.452],
                "Lon": [-15.789],
                "Depth": [1000],
                "Time": ['2022-06-22 12:30:00', '2022-06-22 12:40:00', '2022-06-22 12:50:00']
            },
            "data":{
                "names": ["TEMP", "PSAL"],
                "units": ["degC", "PSU"],
                "values": [
                    [7.0, 8.0, 9.0],
                    [21.0, 22.0, 23.0]
                ]
            }
        }
    
    ]

    const options = {
      exporting:{
        enabled: true
    },
    accessibility: {
      enabled: false
    },
      title: {
        text: 'Sample chart'
      },
      yAxis: [{ // Primary yAxis
        labels: {
            format: '{value}°C',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: {
            text: 'Temperature',
            style: {
                color: Highcharts.getOptions().colors[1]
            }
        },
        opposite: false
    }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Sea-Level Depth',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} m',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        exporting: {
          enabled: true
        },
      series: [
        {
          name: 'DEPTH',
          type: 'spline',
          yAxis: 1,
          color: '#071418',
          data: [[new Date('2022-06-22 12:30:00').getTime(), 1000],
          [new Date('2022-06-22 12:40:00').getTime(), 1000],
          [new Date('2022-06-22 12:50:00').getTime(), 1000]],
          marker: {
            enabled: false
          },
          dashStyle: 'shortdot',
          tooltip: {
            valueSuffix: ' m'
          }
        },
        {
          name: 'TEMP',
          type: 'line',
          color: '#7cb5ef',
          data: [[new Date('2022-06-22 12:30:00').getTime(),5],
          [new Date('2022-06-22 12:40:00').getTime(), 7],
          [new Date('2022-06-22 12:50:00').getTime(), 3]],
          tooltip: {
            valueSuffix: '°C'
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

export default FixedObsHighcharts;
