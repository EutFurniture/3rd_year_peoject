import React, { useState,useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from 'axios'

const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

function OrderChart() {

  const [orderanalyze,setOrderAnalyze]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/OrderChart").then((response)=>{
      setOrderAnalyze(response.data)
    })
  },[])

  const arr=orderanalyze.map(record=>dateOnly(record.o_date));
const cat=orderanalyze.map(record=>record.count);

  return (
      
        <div className="mixed-chart">
          <ReactApexChart
            options={{
              chart: {
                id: "basic-bar"
              },
              xaxis: {
                categories: arr
              }
            }}
            series={[
              {
                name: "No of orders",
                data:cat
              }
            ]}
            type="line"
            width="1200"
            height="300"
          />
        </div>
    
  )
}

export default OrderChart;