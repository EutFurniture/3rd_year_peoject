import React from 'react';
import {Doughnut} from 'react-chartjs-2';
const data = {
 
  labels: [
    'Red',
    'Green',
    'Yellow',
    'blue'
  ],
  datasets: [{
    data: [10, 50, 20,30],
    backgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    'green'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    'green'
    ]
  }]
};
function DoughnutChart() {
  return (
    <div  style={{width:'350px'}}>
        <h2 style={{marginLeft:'20px'}}><b>Returned Items</b></h2>
        <Doughnut data={data} />
    </div>
  );
}
export default DoughnutChart;