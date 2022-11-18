import React from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';
import { DateRange } from '@mui/icons-material';
// init the module
exporting(Highcharts);
const FixedObsHighStockSediments = ({data}) => {
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
            name:`<b>Time bounds: ${list_sediments[2]} days<br>Bottle number: #${list_sediments[3]}<br>Depth: ${list_sediments[4]} meters<br>${list_sediments[5]}</b><br>`,
            x:list_sediments[0],
            y:list_sediments[1]
        })
      })

    }
    console.log(data_time)
    const options = {
        chart: {
          animation: false,
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