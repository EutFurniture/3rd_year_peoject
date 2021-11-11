import React from 'react'
import { Fragment, useEffect, useState } from 'react';
import {Table} from 'react-bootstrap';
import Axios from 'axios';
import { useParams } from "react-router-dom";
export default function TotalPaymentSpilit(userData) {
      const { order_id } = useParams();
      const [user, setUser] = useState([])
      const [order, setOrder] = useState([])

      useEffect(() => {
            const fetchData = async () => {
                  console.log(userData.userData);

                  const response = await Axios.get('http://localhost:3001/payHistory', {
                        params: {
                              customer_id: userData.userData,

                        }
                  });

                  setUser(response.data);


            };
            fetchData();
      }, [order_id]);
      return (
            <Fragment>

                

                        <Table striped bordered hover responsive>
                              <thead className="tableheading1">
                                    <tr>

                                          <th>Order ID</th>
                                          <th>Payment Method</th>
                                          <th>Total Amount</th>
                                          

                                    </tr>
                              </thead>
                              <tbody >
                                    <Fragment>
                                          {user.map(item =>
                                                <tr key={item.customer_id}>


                                                     
                                                      <td>{item.order_id}</td>
                                                      <td>{item.payment_method}</td>
                                                      <td>Rs.{item.total_price.toString()
                                                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}.00</td>

                                                </tr>
                                          )}
                                    </Fragment>


                              </tbody>
                        </Table>

                 
            </Fragment>



      )
}
