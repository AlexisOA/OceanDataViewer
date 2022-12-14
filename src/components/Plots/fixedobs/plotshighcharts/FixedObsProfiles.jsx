import React from 'react';
import Highcharts from 'highcharts';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';

exporting(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
const FixedObsProfiles = ({data}) => {
    console.log(data);
    console.log("*****************");
    let series = []
    data.dataset.map((value, index) => {
        let data_series = []
        let chartData = value.dataset.values.sort((a, b) => a[a] - b[0]);
        chartData.map((val, idx) => {
            data_series.push(
                {
                    x: val[1],
                    y: val[0]
                }
            )
        })
        series.push({
            name:value.time,
            data:data_series,
            turboThreshold: 0
        })
    })
    console.log(series)
    const options = {
        chart: {
            type: "line",
            inverted: true,
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
            reversed: true,
            title: {
              text: data.dataset[0].Standard_name_coord.toLowerCase()
            }
          }, ],
          yAxis: {
            title: {
              text: data.dataset[0].long_name
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
