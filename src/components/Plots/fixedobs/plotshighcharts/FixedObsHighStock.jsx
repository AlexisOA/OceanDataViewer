import React from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';
// init the module
exporting(Highcharts);

const FixedObsHighStock = () => {

    const options = {
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
          text: 'Sample chart'
        },
        yAxis: [{ // Primary yAxis
          labels: {
              format: '{value}°C',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          title: {
              text: 'Temperature',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          opposite: false
      }],
        series: [
          {
            name: 'DEPTH',
            type: 'spline',
            color: '#7cb5ef',
            data: [
              [new Date('2019-12-03 04:15:56').getTime(), 21.0943],
              [new Date('2019-12-03 04:30:00').getTime(), 21.0951],
              [new Date('2019-12-03 04:46:52').getTime(), 21.0951],
              [new Date('2019-12-03 05:00:56').getTime(), 21.0923],
              [new Date('2019-12-03 05:15:00').getTime(), 21.093],
              [new Date('2019-12-03 05:31:52').getTime(), 21.0995],
              [new Date('2019-12-03 05:45:56').getTime(), 21.0965],
              [new Date('2019-12-03 06:00:00').getTime(), 21.0882],
              [new Date('2019-12-03 06:16:52').getTime(), 21.0915],
              [new Date('2019-12-03 06:30:56').getTime(), 21.0964],
              [new Date('2019-12-03 06:45:00').getTime(), 21.0912],
              [new Date('2019-12-03 07:01:52').getTime(), 21.0939],
              [new Date('2019-12-03 07:15:56').getTime(), 21.09],
              [new Date('2019-12-03 07:30:00').getTime(), 21.0905],
              [new Date('2019-12-03 07:46:52').getTime(), 21.0853],
              [new Date('2019-12-03 08:00:56').getTime(), 21.0783],
              [new Date('2019-12-03 08:15:00').getTime(), 21.0863],
              [new Date('2019-12-03 08:31:52').getTime(), 21.0717],
              [new Date('2019-12-03 08:45:56').getTime(), 21.0762],
              [new Date('2019-12-03 09:00:00').getTime(), 21.082],
              [new Date('2019-12-03 09:16:52').getTime(), 21.0734],
              [new Date('2019-12-03 09:30:56').getTime(), 21.0818],
              [new Date('2019-12-03 09:45:00').getTime(), 21.08],
              [new Date('2019-12-03 10:01:52').getTime(), 21.0844],
              [new Date('2019-12-03 10:15:56').getTime(), 21.0913],
              [new Date('2019-12-03 10:30:00').getTime(), 21.0938],
              [new Date('2019-12-03 10:46:52').getTime(), 21.0932],
              [new Date('2019-12-03 11:00:56').getTime(), 21.0951],
              [new Date('2019-12-03 11:15:00').getTime(), 21.0759],
              [new Date('2019-12-03 11:31:52').getTime(), 21.0831],
              [new Date('2019-12-03 11:45:56').getTime(), 21.0789],
              [new Date('2019-12-03 12:02:48').getTime(), 21.0849],
              [new Date('2019-12-03 12:16:52').getTime(), 21.0738],
              [new Date('2019-12-03 12:30:56').getTime(), 21.0781],
              [new Date('2019-12-03 12:45:00').getTime(), 21.078],
              [new Date('2019-12-03 13:01:52').getTime(), 21.0763], 
              [new Date('2019-12-03 13:15:56').getTime(), 21.0733],
              [new Date('2019-12-03 13:30:00').getTime(), 21.0691], 
              [new Date('2019-12-03 13:46:52').getTime(), 21.0778], 
              [new Date('2019-12-03 14:00:56').getTime(), 21.0809], 
              [new Date('2019-12-03 14:15:00').getTime(), 21.0819]
            ],
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

export default FixedObsHighStock;
