import React from 'react';
import Highcharts from 'highcharts/highstock';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';
import { useSelector, useDispatch } from 'react-redux';
import { setSizeWindow } from '../../../../store/actions/windowActions';
// init the module
exporting(Highcharts);

const FixedObsHighStockMeteo = ({data}) => {
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
          tableCaption: 'Data table (dd-mm-aaaa h:m)',
        csv: {
          columnHeaderFormatter: function(item, key) {
            if (!item || item instanceof Highcharts.Axis) {
              return 'Datetime';
          }
            // Item is not axis, now we are working with series.
            // Key is the property on the series we show in this column.
            return {
                topLevelColumnTitle: `${data.Standard_name} (${data.dataset.units[0].toLowerCase()}) - ${data.Standard_name_coord.toLowerCase()} (${data.dataset.units[1]})`,
                columnTitle: key === 'y' ? `${data.name_data} (${data.dataset.units[0].toLowerCase()}) (at ${data.value_coord} ${data.dataset.units[1].toLowerCase()})` : key
                
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
              // style: {
              //     color: Highcharts.getOptions().colors[0]
              // }
          },
          title: {
              text: data.name_data,
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          opposite: false
      }],
      plotOptions: {
        series: {
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: stops
          }
        },
        spline: {
            // marker: {
            //     radius: 2,
            //     states: {
            //         hover: {
            //             enabled: true,
            //             lineColor: 'rgb(100,100,100)'
            //         }
            //     }
            // },
            marker: {
              radius: 3,
              states: {
                  hover: {
                      enabled: true
                  }
              },
              fillColor: '#000000',
              lineWidth: 2,
              color: '#000000',
              linecolor: '#000000'
          },
            tooltip: {
              valueDecimals: 3
            }
        }
    },
        series: [
          {
            name: data.Standard_name,
            // color: '#7cb5ef',
            type: 'spline',
            data: data_time.sort(),
            tooltip: {
              valueSuffix: " " + data.dataset.units[0],
              valueDecimals: 3
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

export default FixedObsHighStockMeteo;
