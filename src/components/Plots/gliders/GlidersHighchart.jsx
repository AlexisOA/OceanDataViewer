import React from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';
import {useDispatch } from 'react-redux';

var renderEvent = true;
const GlidersHighchart = ({dataset}) => {
    console.log(dataset)

    let data_time = []
    if("values" in dataset.variable_info.dataset){
        dataset.variable_info.dataset.values.map((value, index) => {
        data_time.push([new Date(value[0]).getTime(), value[1]])
      })
    }
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
          accessibility: {
            enabled: false
          },
          legend: {
            enabled: true
        },
        title: {
            text: dataset.variable_info.dataset.axis[1]
          },
          yAxis: [{ // Primary yAxis
            labels: {
                // format: '{value}°C',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: dataset.variable_info.dataset.axis[0],
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: false
        }],

        series: [{
            type: 'spline',
            name: `<b>${dataset.variable_info.dataset.short_names[1]} (${dataset.variable_info.dataset.units})</b>`,
            // color: '#7cb5ef',
            data: data_time.sort(),
            marker: {enabled: false, radius : 3},
            stickyTracking: true,
            gapSize: 2000000,
            gapUnit: 'value',
            tooltip: {
              valueSuffix: " " + dataset.variable_info.dataset.units[0],
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
    return (
        <div className='leaflet-bottom leaflet-left'>
            <div className='container-high leaflet-control'>
                    <HighchartsReact
                    highcharts={Highcharts}
                    constructorType={'stockChart'}
                    options={options}
                    />
            </div>
        </div>
    );
}

export default GlidersHighchart;
