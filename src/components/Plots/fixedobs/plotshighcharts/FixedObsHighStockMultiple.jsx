import React from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';
import { useDispatch } from 'react-redux';
import { setSizeWindow } from '../../../../store/actions/windowActions';
// init the module
exporting(Highcharts);
require("highcharts/modules/export-data")(Highcharts);

const FixedObsHighStockMultiple = ({data}) => {
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
    let series = []
    let visible = true

    data.dataset_multiple.map((value, index) => {
        let data_time = []
        value.values.map((value_data, idx) => {
              data_time.push([new Date(value_data[0]).getTime(), value_data[1]])
        })

        const obj = {
            name: `<b>${data.Standard_name_coord} ${value.value_coord} </b>`,
            color: data.colors[index],
            data: data_time.sort(),
            lineWidth: 0,
            visible:visible,
            marker: {
              enabled: true,
              radius: 2
            },
            tooltip: {
              valueSuffix: " " + value.units[0],
              valueDecimals: 3
            },
            states: {
              hover: {
                  lineWidthPlus: 0
              }
            }
          }
          series.push(obj);
          visible = false;
    })

    const options = {
        chart: {
          animation: false,
          backgroundColor: "#f2f4f5",
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
          buttons: {
            contextButton: {
                menuItems: [
                    'downloadPNG',
                    'downloadJPEG',
                    'downloadPDF',
                    'downloadSVG',
                    'downloadCSV',
                    'downloadXLS',
                    'viewData'
                  ]
                }
          },
          tableCaption: 'Data table (dd-mm-aaaa h:m)',
          csv: {
            columnHeaderFormatter: function(item, key) {
              if (!item || item instanceof Highcharts.Axis) {
                return 'Datetime';
              }
              // Item is not axis, now we are working with series.
              // Key is the property on the series we show in this column.
              return {
                  topLevelColumnTitle: `${data.Standard_name} (${data.dataset_multiple[0].units[0].toLowerCase()}) - ${data.Standard_name_coord.toLowerCase()} (${data.dataset_multiple[0].units[1].toLowerCase()})`,
                  columnTitle: key === 'y' ? `${data.name_data}(${data.dataset_multiple[0].units[0].toLowerCase()}) (at ${data.dataset_multiple[item.index].value_coord} ${data.dataset_multiple[0].units[1].toLowerCase()})` : key
                  
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
          series: series
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

export default FixedObsHighStockMultiple;
