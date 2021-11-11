import React ,{ useState, useEffect } from 'react';
import {Card} from 'react-bootstrap';
import {Form, Row, Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";

const dateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year} - ${month} - ${day}`;
  };
  
// const styles = {
//    confirmbtn:{
//         backgroundColor: '#007E33',
//         width: '200px',
//         textDecoration: 'none',
//         height: '100px',
//         marginRight: '10px',
//         fontSize: '17px',
//         paddingLeft: '15px',
//         paddingRight: '15px',
//         paddingTop: '10px',
//         paddingBottom: '10px',
//         color: 'white',
//         borderRadius: '7px',
//       },
// }

function Sales_View_Notification_order() {

    const [orderList,setorderList]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/sales_vieworderNotification").then((response)=>{
      setorderList(response.data)
    })
  },[])


    return (
        <div>
            {orderList.map((val, key) => {
                    return (
                        <div>
                        <Card border="primary" >
                            <Form style={{marginLeft:'30px'}}>
                            <Form.Group as={Row} controlId="formHorizontalName">
                            <Form.Label column lg={2} >
                            Order Id  :
                            </Form.Label>
                            <Col >
                            <Form.Label column lg={2} >
                            {val.order_id}
                            </Form.Label>
                            </Col>
                            </Form.Group><br/>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Customer ID :
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                {val.customer_id}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Status  :
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                {val.status}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>
                            {/* <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Order Description  :
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                {val.order_description}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/> */}

                             <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Order Date :
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                {dateOnly(val.o_date)}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>

                            <Form.Group as={Row} controlId="formHorizontalName">
                                <Form.Label column lg={2} >
                                Delivery Date :
                                </Form.Label>
                                <Col >
                                <Form.Label column lg={2} >
                                {dateOnly(val.order_last_date)}
                                </Form.Label>
                                </Col>
                            </Form.Group><br/>
            
                            <div align='right'>
                                
                                
                                <Link to={location=> `/OrdersEdit/${val.order_id}`} className="updatebtn ">
                           Update Delivery Date
                          </Link>
                                
                            </div>
                            <br></br>
                        </Form>  
                        </Card>
                        <br></br><br></br>
                        </div>
            
            )
        })}
            
            
        </div>
    )
}

export default Sales_View_Notification_order;
