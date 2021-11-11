import React,{useState} from "react";
import Chart from "react-apexcharts";
import axios from 'axios';
import { Table } from "react-bootstrap";
import {Button} from "@material-ui/core"
import {Form, Row, Col} from "react-bootstrap";
import Title from "./Title";

const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };

  export default function ReportDetails1() {

    const[to_date,setTodate]=useState("");
    const[from_date,setFromdate]=useState("");
    const [deliveryList,setDeliveryList]=useState([])
    const [statusList,setstatusList]=useState([]);
    const [orderList,setorderList]=useState([]);
    const [cashList,setcashList]=useState([])
    const [paymentList,setpaymentList]=useState([]);
    const [returnList,setreturnList]=useState([])
    const [totalList,settotalList]=useState([]);
    const [returnsList,setreturnsList]=useState([]);
    const [deliverList,setdeliverList]=useState([])
    const [ordersList,setordersList]=useState([]);

    const Delivery = async () => {
        const response = await axios.get('http://localhost:3001/salesReport', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        setDeliveryList(response.data)

        const response1 = await axios.get('http://localhost:3001/sales_orderstatuscount', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        setstatusList(response1.data)

        const response2 = await axios.get('http://localhost:3001/sales_ordervsdate', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        setorderList(response2.data)

        const response3 = await axios.get('http://localhost:3001/sales_CashReport', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        setcashList(response3.data)

        const response4 = await axios.get('http://localhost:3001/sales_paymentdonut', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        setpaymentList(response4.data)

        // const response5 = await axios.get('http://localhost:3001/sales_ReturnReport', {
        //     params: {
        //        to_date:to_date,  
        //        from_date:from_date
        //     }
            
        // });
        // setreturnList(response5.data)

        const response6 = await axios.get('http://localhost:3001/sales_totalordercnt', {
            params: {
               to_date:to_date,  
               from_date:from_date
            }
            
        });
        settotalList(response6.data)

        // const response7 = await axios.get('http://localhost:3001/sales_returnordercnt', {
        //     params: {
        //        to_date:to_date,  
        //        from_date:from_date
        //     }
            
        // });
        // setreturnsList(response7.data)

        // const response8 = await axios.get('http://localhost:3001/sales_DeliverReport', {
        //     params: {
        //        to_date:to_date,  
        //        from_date:from_date
        //     }
            
        // });
        // setdeliverList(response8.data)

        // const response9 = await axios.get('http://localhost:3001/sales_delivervsorder', {
        //     params: {
        //        to_date:to_date,  
        //        from_date:from_date
        //     }
            
        // });
        // setordersList(response9.data)

    }

        const orders1=statusList.map(record=>record.count);
        const status1=statusList.map(record=>record.status);

        const orders2=orderList.map(record=>record.count);
        const date=orderList.map(record=>dateOnly(record.o_date));

        const count1=paymentList.map(record=>record.count);
        const status2=paymentList.map(record=>record.payment_status);

        const t_count=totalList.map(record=>record.t_count);
        const r_count=returnsList.map(record=>record.r_count);
        //const returncount = (r_count/t_count) * 100

        //const orders3=ordersList.map(record=>record.count);
        //const deliver=ordersList.map(record=>record.name);

    return (
        <div>
                <h4 align = "center"><Title>Sales Report</Title></h4>
                <br></br><br></br>
                <Form>

                    <div style={{display:'flex' , justifyContent:'space-between', flexWrap:'nowrap'}}>
                        <div>
                        <Form.Group as={Row} controlId="formGridfromDate">
                        <Form.Label column lg={2}>
                            From:
                        </Form.Label>
                        <Col>
                        <Form.Control type="date" onChange={(event)=> {setFromdate(event.target.value);}} />
                        </Col>
                        </Form.Group>
                        </div>

                        <div>
                        <Form.Group as={Row} controlId="formGridtoDate">
                        <Form.Label column lg={2}>
                            To:
                        </Form.Label>
                        <Col>
                        <Form.Control type = "date" onChange={(event)=> {setTodate(event.target.value);}} />
                        </Col>   
                        </Form.Group> 
                        </div>

                                       
                                       
                        <div>
                        <Button variant="contained" color="primary" onClick={()=>{Delivery()}}>Generate</Button>
                        </div>
                    </div>
                </Form>
                   
                <br></br>  
                    
               <br/>
               <br/>
                <Title>Sales From {from_date} To {to_date}</Title>
                <br/>
                <Table striped bordered hover responsive>
                <thead className="tableheading" >
                    <tr>
                    <th scope="col">OrderId</th>
                    <th scope="col">Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Total</th>
                    <th scope="col">Order Date</th> 
                    <th scope="col">Delivery Date</th> 
                    
                    </tr>
                </thead>

                <tbody>
                {deliveryList.map((record)=>{
                return(
                    <tr>
                    <th scope="row">{record.order_id}</th>
                    <td>{record.order_type}</td>
                    <td>{record.status}</td>
                    <td>{record.total_price}</td>
                    <td>{dateOnly(record.o_date)}</td>   
                    <td>{dateOnly(record.order_last_date)}</td>   
                </tr>
                )
                })}
                    
                </tbody> 
                </Table><br></br>

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
                </div><br></br><br></br>

                <Title>Payment Details From {from_date} To {to_date}</Title>
                <br/>
                <Table striped bordered hover responsive>
                <thead className="tableheading" >
                    <tr>
                    <th scope="col">OrderId</th>
                    <th scope="col">Total</th>
                    <th scope="col">Rest</th>
                    <th scope="col">Status</th>
                    <th scope="col">Method</th>
        
                    </tr>
                </thead>

                <tbody>
                {cashList.map((record)=>{
                return(
                    <tr>
                    <th scope="row">{record.order_id}</th>
                    <td>{record.total_price}</td>
                    <td>{record.total_price - record.advance_price }</td>
                    <td>{record.payment_status}</td>
                    <td>{record.payment_method}</td>  
                </tr>
                )
                })}
                    
                </tbody> 
                </Table><br></br><br></br>

                
                <div style={{display:'flex' , flexWrap:'wrap',justifyContent:'space-between'}}>
                    <div id="chart">
                        <Title>Order Status From {from_date} To {to_date}</Title>
                        <br/>
                        <Chart 
                            options={{
                            chart: {
                                width: 380,
                                type: 'pie',
                                },
                                labels: status1,
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
                                }] }
                                }
                            series={orders1}
                        
                            type="pie"
                            width={450}
                            height={350}
                            />
                    </div>
                    <div id="chart">
                            <Title>Payment Status From {from_date} To {to_date}</Title>
                            <br/>
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
                            width="400" 
                            height="250"
                            />
                    </div> 
                </div>        
            <br></br><br></br>
        </div>
    )
}

