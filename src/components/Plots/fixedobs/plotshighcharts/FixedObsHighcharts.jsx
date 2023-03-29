import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts';
import exporting from "highcharts/modules/exporting.js";
import HighchartsReact from 'highcharts-react-official';
import drilldown from 'highcharts/modules/drilldown.js';
import { useDispatch } from 'react-redux';
import { setSizeWindow } from '../../../../store/actions/windowActions';
// init the module
exporting(Highcharts);
drilldown(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
const FixedObsHighcharts = ({data}) => {


  const dispatch = useDispatch();
  let chartData = data.dataset.values.sort((a, b) => a[0] - b[0]);
  useEffect(() => {
  }, []);
  console.log(data);
  (function(H) {
    H.wrap(H.Chart.prototype, 'getDataRows', function(proceed, multiLevelHeaders) {
        var rows = proceed.call(this, multiLevelHeaders),
            xMin = this.xAxis[0].min,
            xMax = this.xAxis[0].max,
            yMin = this.yAxis[0].min,
            yMax = this.yAxis[0].max;

        rows = rows.filter(function(row) {
            return typeof row.x !== 'number' || ((row[0] >= xMin && row[0] <= xMax) && (row[1] >= yMin && row[1] <= yMax));
        });
        return rows;
    });
  }(Highcharts));

  let options = {}

    options = {
      chart: {
        zoomType: 'y',
        panning: true,
        panKey: 'shift',
        backgroundColor: "#f2f4f5",
        scrollablePlotArea: {
            minWidth: 600
        },
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
        csv: {
          columnHeaderFormatter: function(item, key) {
            if (item.isXAxis) {
              return data.name_data
            } else {
              return data.Standard_name_coord
            }
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
        // },
    },
    accessibility: {
      enabled: false
    },
    title: {
      text: data.Standard_name
    },
    xAxis: {
      title: {
        text: data.name_data
    }
  },
    yAxis: [{ // Tertiary yAxis
        reversed:true,
          gridLineWidth: 0,
          title: {
              text: data.Standard_name_coord,
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          labels: {
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          }
      }],
      plotOptions: {
        spline: {
            marker: {
                radius: 2,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            tooltip: {
                headerFormat: `<b>${data.Standard_name_coord} - ${data.name_data}</b><br>`,
                pointFormat: `{point.y} ${data.dataset.units[1]}, {point.x} ${data.dataset.units[0]}`
            }
        }
    },
    colorAxis: {
      min: 1,
      max: 50,
      type: 'logarithmic',
      minColor: '#EEEEFF',
      maxColor: '#ff0000'
  },
      series: [
        {
          name: data.name_data,
          type: 'spline',
          colorAxis: null,
          data: chartData,
          turboThreshold:5000,
          tooltip: {
            valueDecimals: 3
          },
        }
      ]
    };
    
    

    return (
        <div>
        <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
        </div>
    );
}

export default FixedObsHighcharts;
