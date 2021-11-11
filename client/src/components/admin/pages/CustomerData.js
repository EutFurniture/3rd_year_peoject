import React,{useState,useEffect} from 'react';
import axios from 'axios'
import {Bar, Pie, Doughnut,Line} from 'react-chartjs-2'
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import {Table} from 'react-bootstrap';

const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

  
export default function CustomerData() {
    const[to_date,setTodate]=useState("");
    const[from_date,setFromdate]=useState("");
    const [orderanalyze,setOrderAnalyze]=useState([])
    const [cusList,setCusList]=useState([])
    const [ordList,setOrdList]=useState([])
    const [returnList,setReturnList]=useState([])
    const [returncList,setReturnCList]=useState([])
    const [customercount,setCustomerCount]=useState([])
    const [customizedList,setCustomizedList]=useState([])
    const [cusorderList,setCusOrderList]=useState([])
    const [deliveryList,setDeliveryList]=useState([])
    const [quantityList,setQuantityList]=useState([])
    const [deliveryList1,setDeliveryList1]=useState([])
    const [payList,setPayList]=useState([])
    const [paycatList,setCatPayList]=useState([])
  
    const customer = async () => {
        const response = await axios.get('http://localhost:3001/CustomerReport1', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
   
        setCusList(response.data);

        const response2 = await axios.get('http://localhost:3001/OrderReport1', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
   
        setOrdList(response2.data);

        const response1 = await axios.get('http://localhost:3001/CustomerCount1', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
   
        setCustomerCount(response1.data) 

        const response3 = await axios.get('http://localhost:3001/OrderChart', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
    
        setOrderAnalyze(response3.data) 

        const response4 = await axios.get('http://localhost:3001/ReturnItemReport1', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
    
        setReturnList(response4.data) 

        const response5 = await axios.get('http://localhost:3001/ReturnCount1', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
    
        setReturnCList(response5.data) 

        const response6 = await axios.get('http://localhost:3001/CustomizedReport1', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
    
        setCustomizedList(response6.data) 

        const response7 = await axios.get('http://localhost:3001/Cus_OrderChart', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
    
        setCusOrderList(response7.data) 

        const response8 = await axios.get('http://localhost:3001/DeliveryReport1', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
    
        setDeliveryList(response8.data) 

        const response9 = await axios.get('http://localhost:3001/DeliveryStatus1', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
    
        setDeliveryList1(response9.data) 

        const response10 = await axios.get('http://localhost:3001/PaymentNewReport1', {
          params: {
             to_date:to_date,  
             from_date:from_date
          }
          
      });
  
      setPayList(response10.data) 

      const response11 = await axios.get('http://localhost:3001/PaymentCategory1', {
        params: {
           to_date:to_date,  
           from_date:from_date
        }
        
    });

    setCatPayList(response11.data) 
    
    }
    const month=customercount.map(record=>dateOnly(record.date));
    const count=customercount.map(record=>record.count);

    const arr=orderanalyze.map(record=>dateOnly(record.o_date));
    const cat=orderanalyze.map(record=>record.count);

    const item=returncList.map(record=>record.name);
    const value=returncList.map(record=>record.count);

    const cus_quantity=cusorderList.map(record=>record.quantity);
    const cus_cat=cusorderList.map(record=>record.category_name);

    const arr1=quantityList.map(record=>record.quantity);
    const cat1=quantityList.map(record=>record.name);

    const method=paycatList.map(record=>record.payment_method);
    const amount=paycatList.map(record=>record.total);

    const count1 = deliveryList1.map(record=>record.count);
    
      return (
        <div style={{width:'1150px',alignItems:'center',marginRight:'30px',marginLeft:'30px'}}>
       
         <div style={{display:'flex',alignItems:'center',backgroundColor:'#f2f3f4',height:'100px'}}>
                   <div>
                  <label style={{marginLeft:'40px',fontSize:'18px'}}>From Date</label>
                  <input type='date' style={{width:'300px',height:'40px',border:'none',backgroundColor:'white',paddingLeft:'20px',marginTop:'10px',marginLeft:'20px',borderRadius:'10px'}} placeholder='From Date' 
                   onChange={(event)=> {
                    setFromdate(event.target.value);
                  }} ></input>
                  </div>
                  <div>
               <label style={{marginLeft:'40px',fontSize:'18px'}}>To Date</label>
              <input type='date' style={{width:'300px',height:'40px',border:'none',backgroundColor:'white',paddingLeft:'20px',marginTop:'10px',marginLeft:'20px',borderRadius:'10px'}} placeholder='To date' 
                   onChange={(event)=> {
                    setTodate(event.target.value);
                  }} ></input>
                  </div>
                  <button style={{marginLeft:'30px',fontSize:'20px',width:'150px',height:'40px',backgroundColor:'#0070ff',border:'none',borderRadius:'10px',color:'white',marginTop:'10px'}}
                  onClick={()=>{customer()}}>Generate</button>
                  </div><br/>
                  <h2 style={{marginLeft:'10px',color:'red'}}><b>Customer Details</b></h2><br/>
   <Table  className="Table">
     <thead style={{backgroundColor:'#f2f3f4'}}>
         <tr>
           <th>Customer ID</th>
          
           <th >Full Name</th>
             <th >Email</th>
             <th>Address</th>
             <th>Phone No</th>
             <th>Points</th>
          
         </tr>
     </thead>
     <tbody>
     {cusList.map((record)=>{
                       return(
         <tr>
           <td>{record.customer_id}</td>
           <td>{record.fname}</td>
           <td>{record.email}</td>
           <td>{record.address}</td>
           <td>{record.phone}</td>
           <td>{record.points}</td>
         
         </tr>
              )
           })}
           
     </tbody>
     <caption>Customer Details</caption>
   </Table> 

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
            color:'cyan'
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

<h2 style={{marginLeft:'10px',color:'red'}}><b>Order Details</b></h2>
    <Table className="Table">
          <thead style={{backgroundColor:'#f2f3f4'}}>
              <tr>
                <th>Order ID</th>
               
                <th >Product Name</th>
                  <th >Order Date</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  
              </tr>
          </thead>
          <tbody>
          {ordList.map((record)=>{
                       return(
              <tr>
                <td>{record.order_id}</td>
                <td>{record.product_name}</td>
                <td>{dateOnly(record.o_date)}</td>
                <td>{record.quantity}</td>
                <td>{record.total_price}</td>
             
              </tr>
                   )
                })}
                
          </tbody>
          <caption>Order Details</caption>
        </Table>   

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

        <h2 style={{marginLeft:'10px',color:'red'}}><b>Payment Details</b></h2>
    <Table className="Table">
          <thead style={{backgroundColor:'#f2f3f4'}}>
              <tr>
              <th>Order ID</th>
                            <th>Payment Method</th>
                            <th>Payment Date</th>
                            <th >
                          Amount

                            </th>
                  
              </tr>
          </thead>
          <tbody>
          {payList.map((record)=>{
                       return(
              <tr>
                <td>{record.order_id}</td>
                                    <td>{record.payment_method}</td>
                                    <td>{dateOnly(record.order_last_date)}</td>
                                    <td>{record.total}</td>
             
              </tr>
                   )
                })}
                
          </tbody>
          <caption>Order Details</caption>
        </Table>   
        
        <h2 style={{marginLeft:'10px',color:'red',marginTop:'50px'}}><b> Return Item Details</b></h2>
        <div style={{display:'flex'}}>
              <div style={{width:'700px'}}>
        <Table  className="Table">
          <thead style={{backgroundColor:'#f2f3f4'}}>
              <tr>
                <th>Return ID</th>
               
                <th >Product Name</th>
                  <th >Return Date</th>
                  <th>Reason</th>
                  <th>Reschedule Date</th>
                  <th>Status</th>
                
                  
              </tr>
          </thead>
          <tbody>
          {returnList.map((record)=>{
                       return(
              <tr>
                <td>{record.return_id}</td>
                <td>{record.product_name}</td>
                <td>{dateOnly(record.return_date)}</td>
                <td>{record.reason}</td>
                <td>{dateOnly(record.reschedule_date)}</td>
                <td>{record.return_status}</td>
             
              </tr>
                   )
                })}
                
          </tbody>
          <caption>Return Item Details</caption>
        </Table> 
        </div> 
        <div style={{width:'280px',marginLeft:'40px',marginTop:'1px'}}>
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

            </div>   
        </div>
        <h2 style={{marginLeft:'10px',color:'red',marginTop:'50px'}}><b> Customized Order Details</b></h2>
          
           
        <Table  className="Table">
          <thead style={{backgroundColor:'#f2f3f4'}}>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th >Product Name</th>
                  <th >Image</th>
                
                  
              </tr>
          </thead>
          <tbody>
          {customizedList.map((record)=>{
                       return(
              <tr>
                <td>{record.cus_product_id}</td>
                <td>{record.fname}</td>
                <td>{record.product_name}</td>
                <td><img src={record.design} className='image' alt='/product'/></td>
                
             
              </tr>
                   )
                })}
                
          </tbody>
          <caption>Customize Order Details</caption>
        </Table>
       

        
        

          
        <h2 style={{marginLeft:'10px',color:'red',marginTop:'50px'}}><b> Delivery Details</b></h2>
        <Table  className="Table">
          <thead style={{backgroundColor:'#f2f3f4'}}>
              <tr>
                <th>Order ID</th>
               
                <th >Product Name</th>
                  <th >Delivery Date</th>
                  <th>Status</th>
                 
                  
              </tr>
          </thead>
          <tbody>
          {deliveryList.map((record)=>{
                       return(
              <tr>
                <td>{record.order_id}</td>
                <td>{record.product_name}</td>
                <td>{dateOnly(record.order_last_date)}</td>
                <td>{record.status}</td>
              
             
              </tr>
                   )
                })}
                
          </tbody>
          <caption>Delivery Details</caption>
        </Table>  
<div style={{display:'flex'}}>
  <div style={{width:'600px'}}>
<h2 style={{marginLeft:'10px',color:'red'}}><b>Delivery Status</b></h2>
        <Chart 
    options={{ chart: {
      height: 350,
      type: 'radialBar',
      toolbar: {
        show: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
         hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },
    
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px'
          },
          value: {
            formatter: function(val) {
              return parseInt(val);
            },
            color: '#111',
            fontSize: '36px',
            show: true,
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Completed'],
  }} 
    series={count1} 
    type="radialBar" 
    height={350} 
    width={500}
    />
    </div>
    <div>
    <div style={{marginLeft:'20px'}}>
    <h2 style={{marginLeft:'10px',color:'red'}}><b>Payment Method Status</b></h2>
               <Chart 
            options={{
                chart: {
                    width: 350,
                    type: 'pie',
                  },
                  labels: method,
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
            series={amount} 
            type="pie"
            width={440}
             />
             </div>
    </div>
    </div>   
   </div>

   
      );
    }
  
