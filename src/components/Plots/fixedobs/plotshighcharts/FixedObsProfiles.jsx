import React from 'react';
import Highcharts from 'highcharts';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';

exporting(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
const FixedObsProfiles = ({data}) => {
    console.log("*****************");
    console.log(data)
    let series = []
    data.dataset.map((value, index) => {
        let data_series = []
        let chartData = value.dataset.values.sort((a, b) => a[0] - b[0]);
        // let chartData2 = value.dataset.values.sort((a, b) => b[0] - a[0]);
        // console.log(chartData2)
        // chartData.map((val, idx) => {
        //     data_series.push(
        //         {
        //             x: val[1],
        //             y: val[0]
        //         }
        //     )
        // })
        series.push({
            name: value.time,
            data: chartData,
            turboThreshold: 0
        })
    })
    console.log(series);
    const options = {
        chart: {
            type: "line",
            zoomType: "xy"
          },
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
            
            title: {
              text: data.dataset[0].long_name + " (" + data.dataset[0].units[0] + ")"
            }
          }, ],
          yAxis: {
            reversed: true,
            title: {
              text: data.dataset[0].Standard_name_coord.toLowerCase() + " (" + data.dataset[0].units[1] + ")"
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
