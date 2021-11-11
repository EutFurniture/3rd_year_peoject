import React from 'react'
import { Fragment, useEffect, useState } from 'react';
import './mad.css';
import Footer from './Footer';
import Axios from 'axios';
import { useParams } from "react-router-dom";
export default function Abouthistory(userData) {
      const { order_id } = useParams();
      const [user, setUser] = useState([])
      const [order, setOrder] = useState([])


      useEffect(() => {
            const fetchData = async () => {
                  console.log(userData.userData);

                  const response = await Axios.get('http://localhost:3001/orderHistory', {
                        params: {
                              order_id: userData.userData,

                        }
                  });

                  setUser(response.data);


            };
            fetchData();
      }, [order_id]);
      return (
            <Fragment>

                  <div class="details">

                        <table class="tbl2 content-tablee">
                              <thead>
                                    <tr>

                                          <th></th>
                                          <th></th>
                                          <th>  </th>
                                          <th></th>

                                    </tr>
                              </thead>
                              <tbody>
                                    <Fragment>
                                          {user.map(item =>
                                                <tr key={item.order_id}>


                                                      <td><img className="image" src={`/${item.product_img}`} width="50" /></td>
                                                      <td>{item.product_name}</td>
                                                      <td>{item.quantity}</td>
                                                      <td>Rs.{item.total.toString()
                                                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}.00</td>

                                                </tr>
                                          )}
                                    </Fragment>


                              </tbody>
                        </table>

                  </div>

            </Fragment>



      )
}
