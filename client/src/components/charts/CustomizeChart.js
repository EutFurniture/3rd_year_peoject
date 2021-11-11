
import React, { useState,useEffect } from "react";
import Chart from "react-apexcharts";
import axios from 'axios'

const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

function ReturnItemChart() {

    const [cusorderList,setCusOrderList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/Cus_OrderChart").then((response)=>{
      setCusOrderList(response.data)
      console.log(response)
    })
  },[])


    const cus_quantity=cusorderList.map(record=>record.quantity);
    const cus_cat=cusorderList.map(record=>record.category_name);
  return (
      
        <div className="mixed-chart">
            <Chart 
            options={{
                chart: {
                    width: 300,
                    type: 'pie',
                  },
                  labels: cus_cat,
                  responsive: [{
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 150
                      },
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }] }
        }
            series={cus_quantity} 
            type="pie"
            width={450}
             />
        </div>
    
  )
}

export default ReturnItemChart;