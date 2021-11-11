import React,{useState,useEffect} from "react";


import {Bar, Pie, Doughnut,Line} from 'react-chartjs-2'
import axios from 'axios';

const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

function SalesCustomerChart()
 {
  const [customercount,setCustomerCount]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/sales_CustomerCount").then((response)=>{
      setCustomerCount(response.data)
      console.log(response)
    })
  },[])


  const month=customercount.map(record=>dateOnly(record.date));
const count=customercount.map(record=>record.count);
  return (
    <div>
     
                     
    <Bar  style={{width:'1100px',marginLeft:'10px'}}
    data={{
      labels:month,
      datasets:[{
        label:'No of Customers per month',
        data:count,
        backgroundColor:'#4166f5',
        barThickness:18
      },
      
      
      ]
    }}
    options={{
      tooltips:{
        mode:'index',
        callbacks:{
          label:function(toolTipItem){
            return ("Revenue: $"+toolTipItem.value)
          }
        }
        

      },
      
      scales:{
        xAxes:[
          {
            gridLines:{
            color:'cyan'
          },
            scaleLabel:{
              labelString:'Months',
              display:true,
              fontColor:'blue',
              fontSize:20
            },
            ticks:{
              fontColor:'green'
            }
          }
        ],
        yAxes:[
        {
          gridLines:{
            color:'cyan',
            height:'200px'
          },
          scaleLabel:{
              labelString:'Revenue',
              display:true,
              fontColor:'blue',
              fontSize:20,
            },
          ticks:{
            beginAtZero:true,
            fontColor:'green',
            
          }
        }
        ]
      }
    }}
    >

    </Bar>     
    </div>
  )}
  export default SalesCustomerChart;