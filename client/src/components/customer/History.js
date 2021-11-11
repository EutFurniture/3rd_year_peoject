import React from 'react'
import { Fragment, useEffect, useState } from 'react';
import './mad.css';
import Footer from './Footer';
import Axios from 'axios';
import { useParams } from "react-router-dom";
import Abouthistory from './Abouthistory';
export default function History(userData) {
    const { customer_id } = useParams();
    const [user, setUser] = useState([])
    const [order, setOrder] = useState([])

    const dateOnly = (d) => {
        const date = new Date(d);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year} - ${month} - ${day}`;
    };
    useEffect(() => {
        const fetchData = async () => {
            Axios.get('http://localhost:3001/customerorderlist', {
                params: {
                    customer_id: userData.userData.customer_id,

                }
            }).then((response) => {
                setOrder(response.data);
            })


            const response = await Axios.get('http://localhost:3001/orderHistory', {
                params: {
                    customer_id: userData.userData.customer_id,

                }
            });

            setUser(response.data);


        };
        fetchData();
    }, [customer_id]);
    return (
        <Fragment>

            <div class="details">
                <h3>Order History</h3>
                <table class="tbl2 content-table">
                    <thead >
                        <tr>
                            <th>Order Id</th>
                            <th>Delivery Date</th>
                            <th>Status</th>
                            <th >Product Details

                                <th className="newth">Image</th>
                                <th className="newth">Product Name</th>
                                <th className="newth">Quantity</th>
                                <th className="newth">Price</th>

                            </th>
                            <th>Total Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Fragment>
                            {order.map(item =>
                                <tr key={item.order_id}>
                                    <td>{item.order_id}</td>
                                    <td>{dateOnly(item.o_date)}</td>

                                    <td>{item.status}</td>
                                    <td><Abouthistory userData={item.order_id} /> </td>
                                    <td><strong> Rs.{item.total_price.toString()
                                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}.00 </strong></td>

                                </tr>
                            )}
                        </Fragment>


                    </tbody>
                </table>

            </div>
            <Footer />
        </Fragment>



    )
}
