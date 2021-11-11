import React, {useEffect,useState} from "react";
import Chart from "react-apexcharts";
import axios from 'axios';

function GenerateReport() {

  const [ordersList,setordersList]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3001/delivervsorder').then((response)=>{
      setordersList(response.data);
      console.log(response);
    })
  },[])

  const orders3=ordersList.map(record=>record.count);
  const deliver=ordersList.map(record=>record.name);

    return (
        <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={ {
                chart: {
                  height: 350,
                  type: 'bar',
                  events: {
                    click: function(chart, w, e) {
                    }
                  }
                },
                
                plotOptions: {
                  bar: {
                    columnWidth: '45%',
                    distributed: true,
                  }
                },
                dataLabels: {
                  enabled: false
                },
                legend: {
                  show: false
                },
                
                xaxis: {
                  categories: deliver,
                  labels: {
                    style: {
                      
                      fontSize: '12px'
                    }
                  }
                }
              }}
              series={[
                {
                  name: "Orders",
                  data: orders3
                }
              ]}
              type="bar"
              width="500"
              height="350"
            />
          </div>
        </div>
      </div>
    )
}

export default GenerateReport;

// class ApexChart extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
    
//       series: [
//         {
//           name: "High - 2013",
//           data: [28, 29, 33, 36, 32, 32, 33]
//         },
//         {
//           name: "Low - 2013",
//           data: [12, 11, 14, 18, 17, 13, 13]
//         }
//       ],
//       options: {
//         chart: {
//           height: 350,
//           type: 'line',
//           dropShadow: {
//             enabled: true,
//             color: '#000',
//             top: 18,
//             left: 7,
//             blur: 10,
//             opacity: 0.2
//           },
//           toolbar: {
//             show: false
//           }
//         },
//         colors: ['#77B6EA', '#545454'],
//         dataLabels: {
//           enabled: true,
//         },
//         stroke: {
//           curve: 'smooth'
//         },
//         title: {
//           text: 'Average High & Low Temperature',
//           align: 'left'
//         },
//         grid: {
//           borderColor: '#e7e7e7',
//           row: {
//             colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//             opacity: 0.5
//           },
//         },
//         markers: {
//           size: 1
//         },
//         xaxis: {
//           categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//           title: {
//             text: 'Month'
//           }
//         },
//         yaxis: {
//           title: {
//             text: 'Temperature'
//           },
//           min: 5,
//           max: 40
//         },
//         legend: {
//           position: 'top',
//           horizontalAlign: 'right',
//           floating: true,
//           offsetY: -25,
//           offsetX: -5
//         }
//       },
    
    
//     };
//   }



//   render() {
//     return (
      

// <div id="chart">
// <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
// </div>


//     );
//   }
// }

// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);
