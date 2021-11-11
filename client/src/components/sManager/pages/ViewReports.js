import React,{useEffect,useState} from "react";
import Chart from "react-apexcharts";
import axios from 'axios';

function Delivery() {

  const [orderList,setorderList]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3001/delivervsorder').then((response)=>{
      setorderList(response.data);
      console.log(response);
    })
  },[])


const orders=orderList.map(record=>record.count);
const deliver=orderList.map(record=>record.name);

  return (
      <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <h5 style={{marginLeft:'80px'}}>Deliver and Number of Orders</h5>
          <Chart
            options={{
              chart: {
                id: "basic-bar"
              },
              xaxis: {
                categories: deliver
              }
            }}
            series={[
              {
                name: "Orders",
                data: orders
              }
            ]}
            type="bar"
            width="500"
          />
        </div>
      </div>
    </div>
  )
}

export default Delivery;