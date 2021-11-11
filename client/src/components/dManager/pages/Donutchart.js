import React,{useEffect,useState} from "react";
import Chart from "react-apexcharts";
import axios from 'axios';

function Donutchart() {

  const [paymentList,setpaymentList]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3001/paymentdonut').then((response)=>{
      setpaymentList(response.data);
      console.log(response);
    })
  },[])


const count1=paymentList.map(record=>record.count);
const status2=paymentList.map(record=>record.payment_status);

  return (
    <div id="chart">
      
    <Chart 
    options={{
      chart: {
      type: 'donut',
    },
    labels: status2,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 100
        },
        legend: {
          position: 'bottom'
        }
      }
    }]} }
    series={count1} 
      
    
    type="donut"
    width="500" />
  </div>
  )
}

export default Donutchart;