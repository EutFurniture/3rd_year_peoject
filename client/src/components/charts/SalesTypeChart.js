
import React, { useState,useEffect } from "react";
import {Bar, Pie, Doughnut,Line} from 'react-chartjs-2'
import axios from 'axios'

const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

function SalesTypeChart() {

    const [returnList,setReturnList]=useState([])
    useEffect(()=>{
      axios.get("http://localhost:3001/sales_ReturnCount").then((response)=>{
        setReturnList(response.data)
        console.log(response)
      })
    },[])

  const item=returnList.map(record=>record.name);
const value=returnList.map(record=>record.count);
  return (
      
        <div className="mixed-chart">
          <Doughnut 
               
               data = {{
                labels: item,
                datasets: [{
                  data: value,
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
                } }
               >

               </Doughnut>
        </div>
    
  )
}

export default SalesTypeChart;
