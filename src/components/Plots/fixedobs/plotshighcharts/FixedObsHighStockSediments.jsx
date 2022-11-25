import React from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';
import {useDispatch } from 'react-redux';
import { setSizeWindow } from '../../../../store/actions/windowActions';
// init the module
// init the module
exporting(Highcharts);
require("highcharts/modules/export-data")(Highcharts);

const FixedObsHighStockSediments = ({data}) => {
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
    //Data con sediments_info
    let data_time = []
    let data_finish = []
    if("values" in data.dataset){
      data.dataset.values.map((value, index) => {
        let arr_push = []
        arr_push.push(new Date(value[0]).getTime())
        arr_push.push(value[1])
        data.sediments_info.map((value_sediment, idx) => {
          value_sediment.value.map((val, indx) => {
            if(val[0] === value[0]){
              // console.log("value_real: ", value[0], " - value_sediment: ", val[0])
              arr_push.push(val[1]);
              return;
            }
          })
        })

        arr_push.push(value[0])
        //[new Date(value[0]).getTime(), value[1], 17, 2, value[0]]
        data_time.push(arr_push)
    
      })

      data_time.map((list_sediments, idxs) => {
        data_finish.push({
            name:`Time bounds: ${list_sediments[2]} days - Bottle number: #${list_sediments[3]} - Depth: ${list_sediments[4]} meters - ${list_sediments[5]}`,
            x:list_sediments[0],
            y:list_sediments[1]
        })
      })

    }
    console.log(data_time)
    const options = {
        chart: {
          animation: false,
          events: {
            exportData : function(){
              dispatch(setSizeWindow(window.innerWidth, window.innerHeight))		                
            },
            fullscreenOpen : function(){
              dispatch(setSizeWindow(window.innerWidth, window.innerHeight))		                
            },
            beforePrint : function(){
              dispatch(setSizeWindow(window.innerWidth, window.innerHeight))
            },
          }
        },
        rangeSelector: {
          allButtonsEnabled: true,
          buttons: buttons,
          buttonTheme: {
            width: 49
          },
          selected: 5
        },
        time: {
          timezone: 'Europe/Berlin',
          useUTC: false,
        },
          exporting:{
            enabled: true,
          tableCaption: 'Data table',
        csv: {
          columnHeaderFormatter: function(item, key) {
            if (!item || item instanceof Highcharts.Axis) {
              console.log("----");
              console.log(item);
              return 'Properties';
          }
            // Item is not axis, now we are working with series.
            // Key is the property on the series we show in this column.
            return {
                topLevelColumnTitle: `${data.Standard_name} (${data.dataset.units[0].toLowerCase()})`,
                columnTitle: key === 'y' ? `${data.name_data} (${data.dataset.units[0].toLowerCase()})` : "Datetime"
                
            };
          }
        },
        chartOptions: {
          chart: {
            events: {
              render : function(){
                dispatch(setSizeWindow(window.innerWidth, window.innerHeight))	                
              },
            }
          },
        }
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
            text: data.description + " Data collected at a depth of"
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
              name: `<b>${data.Standard_name_coord} ${data.value_coord} </b>`,
              color: '#7cb5ef',
            //   data: data_time.sort(),
            data: data_finish,
              lineWidth: 0,
              marker: {
                enabled: true,
                radius: 3
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
            },
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

export default FixedObsHighStockSediments;
