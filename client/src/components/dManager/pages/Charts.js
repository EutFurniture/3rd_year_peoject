import React,{useEffect,useState} from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import Title from './Title';



//1-Sep-2021
const dateOnly = (d) => {
  // const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date(d);
  // const curr = months[date.getMonth()]
  // console.log(curr)
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year} - ${month} - ${day}`;
};

const d = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth =  months[d.getMonth() ];
let currentYear = d.getFullYear();

function Charts() {

  const [priceList,setpriceList]=useState([]);
            useEffect(()=>{
              axios.get('http://localhost:3001/pricevsdate').then((response)=>{
                setpriceList(response.data);
                console.log(response);
              })
            },[])

        
        const total=priceList.map(record=>record.total);
        
        const date=priceList.map(record=>dateOnly(record.order_last_date));
        
        

  return (
      <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Title>Delivery Overview - {currentMonth} {currentYear} </Title>
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
                name: "Total Price",
                data: total
              }
            ]}
            type="line"
            width="100%"
            height="160"
          />
        </div>
      </div>
    </div>
  )
}

export default Charts;