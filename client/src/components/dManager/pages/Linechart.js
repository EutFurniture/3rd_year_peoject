import React,{useEffect,useState} from "react";
import Chart from "react-apexcharts";
import axios from 'axios';

const dateOnly = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

function Line() {

  const [orderList,setorderList]=useState([]);
            useEffect(()=>{
              axios.get('http://localhost:3001/ordervsdate').then((response)=>{
                setorderList(response.data);
                console.log(response);
              })
            },[])

        
        const orders2=orderList.map(record=>record.count);
        const date=orderList.map(record=>dateOnly(record.order_last_date));

  return (
      <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={{
              chart: {
                id: "basic-bar"
              },
              xaxis: {
                categories: date
              }
            }}
            series={[
              {
                name: "Orders",
                data: orders2
              }
            ]}
            type="line"
            width="100%"
            height="350"
          />
        </div>
      </div>
    </div>
  )
}

export default Line;