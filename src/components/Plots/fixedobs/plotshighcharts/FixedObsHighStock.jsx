import React from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';
import {useDispatch } from 'react-redux';
import { setSizeWindow } from '../../../../store/actions/windowActions';
// init the module
exporting(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
const FixedObsHighStock = ({data}) => {
  const dispatch = useDispatch();
  (function(H) {
    H.wrap(H.Chart.prototype, 'getDataRows', function(proceed, multiLevelHeaders) {
        var rows = proceed.call(this, multiLevelHeaders),
            xMin = this.xAxis[0].min,
            xMax = this.xAxis[0].max;

        rows = rows.filter(function(row) {
            return typeof row.x !== 'number' || (row.x >= xMin && row.x <= xMax);
        });

        return rows;
    });
  }(Highcharts));

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

    let data_time = []
    if("values" in data.dataset){
      data.dataset.values.map((value, index) => {
        data_time.push([new Date(value[0]).getTime(), value[1]])
      })
    }
    
    const options = {
      chart: {
        animation: false,
        // events: {
        //   exportData : function(){
        //     dispatch(setSizeWindow(window.innerWidth, window.innerHeight))		                
        //   },
        //   fullscreenOpen : function(){
        //     dispatch(setSizeWindow(window.innerWidth, window.innerHeight))		                
        //   },
        //   beforePrint : function(){
        //     dispatch(setSizeWindow(window.innerWidth, window.innerHeight))
        //   },
        // }
      },
      rangeSelector: {
        allButtonsEnabled: true,
        buttons: buttons,
        buttonTheme: {
          width: 49
        },
        selected: 5
      },
        exporting:{
          enabled: true,
          tableCaption: 'Data table',
        csv: {
          columnHeaderFormatter: function(item, key) {
            if (!item || item instanceof Highcharts.Axis) {
              return 'Datetime';
          }
            // Item is not axis, now we are working with series.
            // Key is the property on the series we show in this column.
            return {
                topLevelColumnTitle: `${data.Standard_name} (${data.dataset.units[0].toLowerCase()}) - ${data.Standard_name_coord.toLowerCase()} (${data.dataset.units[1]})`,
                columnTitle: key === 'y' ? `${data.name_data} (${data.value_coord} ${data.dataset.units[1].toLowerCase()})` : key
                
            };
          }
        },
        // chartOptions: {
        //   chart: {
        //     events: {
        //       render : function(){
        //         dispatch(setSizeWindow(window.innerWidth, window.innerHeight))	                
        //       },
        //     }
        //   },
        // }
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
