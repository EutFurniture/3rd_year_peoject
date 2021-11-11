
import React from 'react'
import { Fragment, useEffect, useState } from 'react';
import {Table} from 'react-bootstrap';
import Axios from 'axios';
import { useParams } from "react-router-dom";
export default function PaymentReport(userData) {
      const { order_id } = useParams();
      const { to_date } = useParams();
      const { from_date } = useParams();
      const [user, setUser] = useState([])
      const [order, setOrder] = useState([])

      useEffect(() => {
            const fetchData = async () => {
                  console.log(userData.userData);

                  const response = await Axios.get('http://localhost:3001/PaymentReport1', {
                        params: {
                             order_id: userData.userData,
                             to_date:to_date,  
                             from_date:from_date

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

                                          <th>Product Name</th>
                                          <th>Quantity</th>
                                          <th>Total Amount</th>
                                          

                                    </tr>
                              </thead>
                              <tbody >
                                    <Fragment>
                                          {user.map(item =>
                                                <tr key={item.order_id}>


                                                     
                                                      <td>{item.product_name}</td>
                                                      <td>{item.quantity}</td>
                                                      <td>Rs.{item.total.toString()
                                                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}.00</td>

                                                </tr>
                                          )}
                                    </Fragment>


                              </tbody>
                        </Table>

                 
            </Fragment>



      )
}
