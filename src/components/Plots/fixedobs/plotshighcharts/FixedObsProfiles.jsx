import React from 'react';
import Highcharts from 'highcharts';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';

exporting(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
const FixedObsProfiles = ({data}) => {
    let series = []
    data.dataset.map((value, index) => {
        let data_series = []
        let chartData = value.dataset.values.sort((a, b) => a[0] - b[0]);
        // let chartData2 = value.dataset.values.sort((a, b) => b[0] - a[0]);
        // console.log(chartData2)
        chartData.map((val, idx) => {
            data_series.push(
                {
                    x: val[1],
                    y: val[0]
                }
            )
        })
        series.push({
            name: value.time,
            data: data_series,
            turboThreshold: 0
        })
    })
    // (function(H) {
    //   H.wrap(H.Chart.prototype, 'getDataRows', function(proceed, multiLevelHeaders) {
    //       var rows = proceed.call(this, multiLevelHeaders),
    //           xMin = this.xAxis[0].min,
    //           xMax = this.xAxis[0].max;
  
    //       rows = rows.filter(function(row) {
    //           return typeof row.x !== 'number' || (row.x >= xMin && row.x <= xMax);
    //       });
  
    //       return rows;
    //   });
    // }(Highcharts));
    
    const options = {
        chart: {
            type: "line",
            inverted: true,
            zoomType: "xy"
          },
          // exporting:{
          //   enabled: true,
          //   tableCaption: 'Data table',
          //     csv: {
          //       columnHeaderFormatter: function(item, key) {
          //         if (!item || item instanceof Highcharts.Axis) {
          //           return 'Datetime';
          //         }
          //         // Item is not axis, now we are working with series.
          //         // Key is the property on the series we show in this column.
          //         return {
          //             topLevelColumnTitle: "a",
          //             columnTitle: key === 'y' ? "e" : key
                      
          //         };
          //       }
          //     },
          // },
          title: {
            text: "Profiles for " + data.dataset[0].long_name
          },
          subtitle: {
            text: data.dataset[0].description
        },
          accessibility: {
            enabled: false
          },
          xAxis: [{
            reversed: true,
            title: {
              text: data.dataset[0].Standard_name_coord.toLowerCase() + " (" + data.dataset[0].units[1] + ")" 
            }
          }, ],
          yAxis: {
            
            title: {
              text: data.dataset[0].long_name + " (" + data.dataset[0].units[0] + ")"
            }
          },
          plotOptions: {
            line: {
              tooltip: {
              headerFormat: '<b>{series.name}</b><br>',
              pointFormat: `{point.x} ${data.dataset[0].units[0]}, {point.y} ${data.dataset[0].units[1]}`
              }
            }
          },
          series: series
    }

    return (
        <div>
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
        </div>
    );
}

export default FixedObsProfiles;
